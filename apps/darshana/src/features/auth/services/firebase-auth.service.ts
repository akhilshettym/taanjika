import {
  createUserWithEmailAndPassword,
  EmailAuthProvider,
  GoogleAuthProvider,
  linkWithCredential,
  reload,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  validatePassword,
  type User,
} from "firebase/auth";
import { getFirebaseAuth } from "@/lib/firebase/client";

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@!%*$#?&]).{8,20}$/;

export async function validateTaanjikaPassword(password: string): Promise<void> {
  if (!passwordRegex.test(password)) {
    throw new Error(
      "Password must be 8–20 characters and include uppercase, lowercase, a number, and one of @!%*$#?&.",
    );
  }
  const result = await validatePassword(getFirebaseAuth(), password);
  if (!result.isValid)
    throw new Error("Password does not meet the Firebase project password policy.");
}

export async function createEmailPasswordAccount(
  email: string,
  password: string,
  firstName: string,
  lastName: string,
): Promise<User> {
  await validateTaanjikaPassword(password);
  const normalizedEmail = email.trim().toLowerCase();
  const existing = getFirebaseAuth().currentUser;
  let user: User;

  // A Google-first user can add an email/password credential while completing Taanjika onboarding.
  if (
    existing?.email?.toLowerCase() === normalizedEmail &&
    existing.providerData.some((provider) => provider.providerId === "google.com") &&
    !existing.providerData.some((provider) => provider.providerId === "password")
  ) {
    const credential = EmailAuthProvider.credential(normalizedEmail, password);
    user = (await linkWithCredential(existing, credential)).user;
  } else if (existing?.email?.toLowerCase() === normalizedEmail) {
    user = existing;
  } else {
    user = (await createUserWithEmailAndPassword(getFirebaseAuth(), normalizedEmail, password))
      .user;
  }

  await updateProfile(user, { displayName: `${firstName.trim()} ${lastName.trim()}`.trim() });
  return user;
}

export async function signInWithEmailPassword(email: string, password: string): Promise<User> {
  return (await signInWithEmailAndPassword(getFirebaseAuth(), email.trim().toLowerCase(), password))
    .user;
}

export async function signInWithGoogle(): Promise<User> {
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: "select_account" });
  return (await signInWithPopup(getFirebaseAuth(), provider)).user;
}

export async function sendVerificationEmail(user: User): Promise<void> {
  await sendEmailVerification(user, {
    url: `${window.location.origin}/verify-email`,
    handleCodeInApp: false,
  });
}

export async function resendVerificationEmail(user: User): Promise<void> {
  await reload(user);
  if (!user.emailVerified) await sendVerificationEmail(user);
}

export async function sendPasswordReset(email: string): Promise<void> {
  await sendPasswordResetEmail(getFirebaseAuth(), email.trim().toLowerCase());
}

export async function refreshFirebaseUser(user: User): Promise<User> {
  await reload(user);
  return getFirebaseAuth().currentUser ?? user;
}

export async function signOutFirebase(): Promise<void> {
  await signOut(getFirebaseAuth());
}
