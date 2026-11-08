import { Injectable, Logger, OnApplicationBootstrap } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { FirebaseAdminService } from "../firebase/firebase-admin.service";
import { DatabaseService } from "../database/database.service";
import { DATABASE_ADVISORY_LOCK_KEY } from "../database/database.constants";
import { UsersRepository } from "../users/users.repository";
import type { UserRecord } from "firebase-admin/auth";

const ADMIN_PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@!%*$#?&]).{8,20}$/;

@Injectable()
export class AdminBootstrapService implements OnApplicationBootstrap {
  private readonly logger = new Logger(AdminBootstrapService.name);
  constructor(
    private readonly config: ConfigService,
    private readonly firebase: FirebaseAdminService,
    private readonly database: DatabaseService,
    private readonly usersRepository: UsersRepository,
  ) {}

  async onApplicationBootstrap(): Promise<void> {
    if (this.config.get<string>("ADMIN_BOOTSTRAP_ENABLED") !== "true") {
      this.logger.log("Admin bootstrap is disabled.");
      return;
    }

    const email = this.required("ADMIN_EMAIL").trim().toLowerCase();
    const password = this.required("ADMIN_PASSWORD");
    const displayName = this.config.get<string>("ADMIN_DISPLAY_NAME")?.trim() || "Taanjika";
    const passwordVersion = this.required("ADMIN_PASSWORD_VERSION");

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error("ADMIN_EMAIL must be valid.");
    if (displayName.length > 161)
      throw new Error("ADMIN_DISPLAY_NAME cannot exceed 161 characters.");
    if (!ADMIN_PASSWORD_REGEX.test(password)) {
      throw new Error(
        "ADMIN_PASSWORD must be 8–20 characters with uppercase, lowercase, a number and one of @!%*$#?&.",
      );
    }

    const client = await this.database.connect();
    let lockAcquired = false;
    try {
      await client.query("SELECT pg_advisory_lock($1)", [DATABASE_ADVISORY_LOCK_KEY]);
      lockAcquired = true;

      const previous = await this.usersRepository.getAdminBootstrapState(client);
      let admin: UserRecord;
      try {
        const existing = await this.firebase.auth.getUserByEmail(email);
        if (existing.disabled)
          throw new Error(
            "Configured Firebase administrator is disabled. Enable it deliberately before bootstrap.",
          );
        const rotatePassword =
          !previous ||
          previous.firebaseUid !== existing.uid ||
          previous.passwordVersion !== passwordVersion;
        admin = await this.firebase.auth.updateUser(existing.uid, {
          displayName,
          ...(rotatePassword ? { password } : {}),
          // This identity is provisioned only from trusted server-side environment configuration.
          emailVerified: true,
        });
      } catch (error) {
        if ((error as { code?: string }).code !== "auth/user-not-found") throw error;
        admin = await this.firebase.auth.createUser({
          email,
          password,
          displayName,
          emailVerified: true,
          disabled: false,
        });
      }

      await client.query("BEGIN");
      try {
        await this.usersRepository.ensureAdmin(client, {
          firebaseUid: admin.uid,
          email: admin.email ?? email,
          displayName,
          passwordVersion,
          previousFirebaseUid: previous?.firebaseUid ?? null,
        });
        await client.query("COMMIT");
      } catch (error) {
        await client.query("ROLLBACK");
        throw error;
      }
      this.logger.log("Taanjika administrator bootstrap completed.");
    } catch (error) {
      this.logger.error(
        "Admin bootstrap failed; Moola will not start with an incomplete configured administrator.",
        error instanceof Error ? error.stack : undefined,
      );
      throw error;
    } finally {
      if (lockAcquired) {
        try {
          await client.query("SELECT pg_advisory_unlock($1)", [DATABASE_ADVISORY_LOCK_KEY]);
        } catch (error) {
          this.logger.error(
            "Could not release admin bootstrap lock.",
            error instanceof Error ? error.stack : undefined,
          );
        }
      }
      client.release();
    }
  }

  private required(key: string): string {
    const value = this.config.get<string>(key);
    if (!value) throw new Error(`${key} is required when admin bootstrap is enabled.`);
    return value;
  }
}
