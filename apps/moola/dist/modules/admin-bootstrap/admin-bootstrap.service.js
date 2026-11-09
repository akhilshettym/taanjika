"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var AdminBootstrapService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminBootstrapService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const firebase_admin_service_1 = require("../firebase/firebase-admin.service");
const database_service_1 = require("../database/database.service");
const database_constants_1 = require("../database/database.constants");
const users_repository_1 = require("../users/users.repository");
const ADMIN_PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@!%*$#?&]).{8,20}$/;
let AdminBootstrapService = AdminBootstrapService_1 = class AdminBootstrapService {
    config;
    firebase;
    database;
    usersRepository;
    logger = new common_1.Logger(AdminBootstrapService_1.name);
    constructor(config, firebase, database, usersRepository) {
        this.config = config;
        this.firebase = firebase;
        this.database = database;
        this.usersRepository = usersRepository;
    }
    async onApplicationBootstrap() {
        if (this.config.get("ADMIN_BOOTSTRAP_ENABLED") !== "true") {
            this.logger.log("Admin bootstrap is disabled.");
            return;
        }
        const email = this.required("ADMIN_EMAIL").trim().toLowerCase();
        const password = this.required("ADMIN_PASSWORD");
        const displayName = this.config.get("ADMIN_DISPLAY_NAME")?.trim() || "Taanjika";
        const passwordVersion = this.required("ADMIN_PASSWORD_VERSION");
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
            throw new Error("ADMIN_EMAIL must be valid.");
        if (displayName.length > 161)
            throw new Error("ADMIN_DISPLAY_NAME cannot exceed 161 characters.");
        if (!ADMIN_PASSWORD_REGEX.test(password)) {
            throw new Error("ADMIN_PASSWORD must be 8–20 characters with uppercase, lowercase, a number and one of @!%*$#?&.");
        }
        const client = await this.database.connect();
        let lockAcquired = false;
        try {
            await client.query("SELECT pg_advisory_lock($1)", [database_constants_1.DATABASE_ADVISORY_LOCK_KEY]);
            lockAcquired = true;
            const previous = await this.usersRepository.getAdminBootstrapState(client);
            let admin;
            try {
                const existing = await this.firebase.auth.getUserByEmail(email);
                if (existing.disabled)
                    throw new Error("Configured Firebase administrator is disabled. Enable it deliberately before bootstrap.");
                const rotatePassword = !previous ||
                    previous.firebaseUid !== existing.uid ||
                    previous.passwordVersion !== passwordVersion;
                admin = await this.firebase.auth.updateUser(existing.uid, {
                    displayName,
                    ...(rotatePassword ? { password } : {}),
                    emailVerified: true,
                });
            }
            catch (error) {
                if (error.code !== "auth/user-not-found")
                    throw error;
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
            }
            catch (error) {
                await client.query("ROLLBACK");
                throw error;
            }
            this.logger.log("Taanjika administrator bootstrap completed.");
        }
        catch (error) {
            this.logger.error("Admin bootstrap failed; Moola will not start with an incomplete configured administrator.", error instanceof Error ? error.stack : undefined);
            throw error;
        }
        finally {
            if (lockAcquired) {
                try {
                    await client.query("SELECT pg_advisory_unlock($1)", [database_constants_1.DATABASE_ADVISORY_LOCK_KEY]);
                }
                catch (error) {
                    this.logger.error("Could not release admin bootstrap lock.", error instanceof Error ? error.stack : undefined);
                }
            }
            client.release();
        }
    }
    required(key) {
        const value = this.config.get(key);
        if (!value)
            throw new Error(`${key} is required when admin bootstrap is enabled.`);
        return value;
    }
};
exports.AdminBootstrapService = AdminBootstrapService;
exports.AdminBootstrapService = AdminBootstrapService = AdminBootstrapService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        firebase_admin_service_1.FirebaseAdminService,
        database_service_1.DatabaseService,
        users_repository_1.UsersRepository])
], AdminBootstrapService);
//# sourceMappingURL=admin-bootstrap.service.js.map