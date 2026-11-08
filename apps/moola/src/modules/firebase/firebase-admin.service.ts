import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { applicationDefault, getApp, getApps, initializeApp } from "firebase-admin/app";
import { getAuth, type Auth } from "firebase-admin/auth";

@Injectable()
export class FirebaseAdminService {
  private readonly firebaseAuth: Auth;

  constructor(config: ConfigService) {
    const projectId = config.get<string>("FIREBASE_PROJECT_ID");
    if (!projectId) throw new Error("FIREBASE_PROJECT_ID is required by Moola.");

    const app =
      getApps().length > 0
        ? getApp()
        : initializeApp({ credential: applicationDefault(), projectId });

    this.firebaseAuth = getAuth(app);
  }

  get auth(): Auth {
    return this.firebaseAuth;
  }
}
