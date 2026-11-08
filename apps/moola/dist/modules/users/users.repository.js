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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersRepository = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../database/database.service");
let UsersRepository = class UsersRepository {
    database;
    constructor(database) {
        this.database = database;
    }
    async registerProfile(principal, dto, termsVersion, privacyVersion) {
        await this.database.transaction(async (client) => {
            const displayName = `${dto.firstName.trim()} ${dto.lastName.trim()}`.trim();
            const result = await client.query(`INSERT INTO users
          (firebase_uid, email, first_name, last_name, display_name, email_verified_at)
         VALUES ($1, $2, $3, $4, $5, CASE WHEN $6 THEN NOW() ELSE NULL END)
         ON CONFLICT (firebase_uid) DO UPDATE SET
           email = EXCLUDED.email,
           first_name = EXCLUDED.first_name,
           last_name = EXCLUDED.last_name,
           display_name = EXCLUDED.display_name,
           email_verified_at = CASE WHEN $6 THEN COALESCE(users.email_verified_at, NOW()) ELSE users.email_verified_at END,
           updated_at = NOW()
         RETURNING id`, [
                principal.uid,
                principal.email.toLowerCase(),
                dto.firstName.trim(),
                dto.lastName.trim(),
                displayName,
                principal.emailVerified,
            ]);
            const userId = result.rows[0]?.id;
            if (!userId)
                throw new Error("Could not create the Taanjika user profile.");
            await client.query(`INSERT INTO user_roles (user_id, role) VALUES ($1, 'CUSTOMER') ON CONFLICT (user_id, role) DO NOTHING`, [userId]);
            await this.insertConsent(client, userId, "TERMS", termsVersion, true);
            await this.insertConsent(client, userId, "PRIVACY", privacyVersion, true);
            await this.insertConsent(client, userId, "MARKETING", "marketing-v1", dto.marketingOptIn === true);
            if (dto.accountIntent === "ARTIST") {
                await client.query(`INSERT INTO artist_applications (user_id, artist_name, status)
           VALUES ($1, $2, 'PENDING')
           ON CONFLICT (user_id) WHERE status = 'PENDING' DO NOTHING`, [userId, displayName]);
            }
        });
        const profile = await this.findByFirebaseUid(principal.uid);
        if (!profile)
            throw new Error("Taanjika profile was not available after registration.");
        return profile;
    }
    async findByFirebaseUid(firebaseUid) {
        const result = await this.database.query(`SELECT u.id, u.firebase_uid AS "firebaseUid", u.email,
              u.first_name AS "firstName", u.last_name AS "lastName",
              u.display_name AS "displayName",
              (u.email_verified_at IS NOT NULL) AS "emailVerified",
              u.status,
              COALESCE(ARRAY_AGG(DISTINCT ur.role) FILTER (WHERE ur.role IS NOT NULL), ARRAY[]::TEXT[]) AS roles,
              (SELECT aa.status FROM artist_applications aa WHERE aa.user_id = u.id ORDER BY aa.created_at DESC LIMIT 1) AS "artistApplicationStatus"
       FROM users u LEFT JOIN user_roles ur ON ur.user_id = u.id
       WHERE u.firebase_uid = $1 GROUP BY u.id`, [firebaseUid]);
        return result.rows[0] ?? null;
    }
    async syncEmailVerification(firebaseUid, emailVerified) {
        if (!emailVerified)
            return;
        await this.database.query(`UPDATE users SET email_verified_at = COALESCE(email_verified_at, NOW()), updated_at = NOW() WHERE firebase_uid = $1`, [firebaseUid]);
    }
    async ensureAdmin(client, input) {
        if (input.previousFirebaseUid && input.previousFirebaseUid !== input.firebaseUid) {
            await client.query(`DELETE FROM user_roles
         WHERE role = 'ADMIN' AND user_id = (SELECT id FROM users WHERE firebase_uid = $1)`, [input.previousFirebaseUid]);
        }
        const displayName = input.displayName.trim() || "Taanjika";
        const result = await client.query(`INSERT INTO users (firebase_uid, email, first_name, last_name, display_name, email_verified_at, status)
       VALUES ($1, $2, $3, NULL, $3, NOW(), 'ACTIVE')
       ON CONFLICT (firebase_uid) DO UPDATE SET
         email = EXCLUDED.email, first_name = EXCLUDED.first_name, last_name = NULL,
         display_name = EXCLUDED.display_name,
         email_verified_at = COALESCE(users.email_verified_at, NOW()), updated_at = NOW()
       RETURNING id`, [input.firebaseUid, input.email.toLowerCase(), displayName]);
        const userId = result.rows[0]?.id;
        if (!userId)
            throw new Error("Could not synchronise the Taanjika admin profile.");
        await client.query(`INSERT INTO user_roles (user_id, role) VALUES ($1, 'ADMIN') ON CONFLICT (user_id, role) DO NOTHING`, [userId]);
        await client.query(`INSERT INTO admin_bootstrap_state (id, firebase_uid, password_version, updated_at)
       VALUES ('primary', $1, $2, NOW())
       ON CONFLICT (id) DO UPDATE SET firebase_uid = EXCLUDED.firebase_uid,
         password_version = EXCLUDED.password_version, updated_at = NOW()`, [input.firebaseUid, input.passwordVersion]);
    }
    async getAdminBootstrapState(client) {
        const result = await client.query(`SELECT firebase_uid AS "firebaseUid", password_version AS "passwordVersion" FROM admin_bootstrap_state WHERE id = 'primary'`);
        return result.rows[0] ?? null;
    }
    async insertConsent(client, userId, type, version, accepted) {
        await client.query(`INSERT INTO user_consents (user_id, consent_type, version, accepted, accepted_at)
       VALUES ($1, $2, $3, $4, CASE WHEN $4 THEN NOW() ELSE NULL END)
       ON CONFLICT (user_id, consent_type, version)
       DO UPDATE SET accepted = EXCLUDED.accepted,
         accepted_at = CASE WHEN EXCLUDED.accepted THEN COALESCE(user_consents.accepted_at, NOW()) ELSE NULL END`, [userId, type, version, accepted]);
    }
};
exports.UsersRepository = UsersRepository;
exports.UsersRepository = UsersRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], UsersRepository);
//# sourceMappingURL=users.repository.js.map