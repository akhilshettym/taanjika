import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import type { Request } from "express";
import { FirebaseAdminService } from "../../firebase/firebase-admin.service";

export interface FirebasePrincipal {
  uid: string;
  email: string;
  emailVerified: boolean;
  name?: string;
}

export type AuthenticatedRequest = Request & { user: FirebasePrincipal };

@Injectable()
export class FirebaseAuthGuard implements CanActivate {
  constructor(private readonly firebaseAdmin: FirebaseAdminService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const authorization = request.headers.authorization;
    if (!authorization?.startsWith("Bearer ")) {
      throw new UnauthorizedException("A Firebase Bearer token is required.");
    }

    const idToken = authorization.slice("Bearer ".length).trim();
    if (!idToken) throw new UnauthorizedException("A Firebase Bearer token is required.");

    try {
      // checkRevoked=true also checks whether Firebase revoked this ID token or disabled the user.
      const decoded = await this.firebaseAdmin.auth.verifyIdToken(idToken, true);
      if (!decoded.uid || !decoded.email) {
        throw new UnauthorizedException("The Firebase account must have an email address.");
      }
      request.user = {
        uid: decoded.uid,
        email: decoded.email.toLowerCase(),
        emailVerified: decoded.email_verified === true,
        name: decoded.name,
      };
      return true;
    } catch (error) {
      if (error instanceof UnauthorizedException) throw error;
      throw new UnauthorizedException("The Firebase ID token is invalid, expired, or revoked.");
    }
  }
}
