"use client";

import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";

let authInstance: Auth | undefined;

export function getFirebaseAuth(): Auth {
  if (typeof window === "undefined") {
    throw new Error("Firebase browser authentication can only be initialized in the browser.");
  }
  if (authInstance) return authInstance;

  const config = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  };

  const missing = Object.entries(config)
    .filter(([, value]) => !value)
    .map(([key]) => key);
  if (missing.length) {
    throw new Error(`Missing Firebase browser configuration: ${missing.join(", ")}`);
  }

  const app = getApps().length
    ? getApp()
    : initializeApp(
        config as {
          apiKey: string;
          authDomain: string;
          projectId: string;
          appId: string;
          messagingSenderId: string;
        },
      );

  authInstance = getAuth(app);
  return authInstance;
}
