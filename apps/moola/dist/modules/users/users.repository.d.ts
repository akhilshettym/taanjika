import type { PoolClient, QueryResultRow } from "pg";
import { DatabaseService } from "../database/database.service";
import type { FirebasePrincipal } from "../auth/guards/firebase-auth.guard";
import type { RegisterProfileDto } from "../auth/dto/register-profile.dto";
export interface UserProfileRecord extends QueryResultRow {
    id: string;
    firebaseUid: string;
    email: string;
    firstName: string;
    lastName: string | null;
    displayName: string;
    emailVerified: boolean;
    status: "ACTIVE" | "SUSPENDED";
    roles: string[];
    artistApplicationStatus: "PENDING" | "APPROVED" | "REJECTED" | null;
}
export declare class UsersRepository {
    private readonly database;
    constructor(database: DatabaseService);
    registerProfile(principal: FirebasePrincipal, dto: RegisterProfileDto, termsVersion: string, privacyVersion: string): Promise<UserProfileRecord>;
    findByFirebaseUid(firebaseUid: string): Promise<UserProfileRecord | null>;
    syncEmailVerification(firebaseUid: string, emailVerified: boolean): Promise<void>;
    ensureAdmin(client: PoolClient, input: {
        firebaseUid: string;
        email: string;
        displayName: string;
        passwordVersion: string;
        previousFirebaseUid?: string | null;
    }): Promise<void>;
    getAdminBootstrapState(client: PoolClient): Promise<{
        firebaseUid: string;
        passwordVersion: string;
    } | null>;
    private insertConsent;
}
