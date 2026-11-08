import { CanActivate, ExecutionContext } from "@nestjs/common";
import type { Request } from "express";
import { FirebaseAdminService } from "../../firebase/firebase-admin.service";
export interface FirebasePrincipal {
    uid: string;
    email: string;
    emailVerified: boolean;
    name?: string;
}
export type AuthenticatedRequest = Request & {
    user: FirebasePrincipal;
};
export declare class FirebaseAuthGuard implements CanActivate {
    private readonly firebaseAdmin;
    constructor(firebaseAdmin: FirebaseAdminService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
