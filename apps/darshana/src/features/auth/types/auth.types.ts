import type { User } from "firebase/auth";

export type AccountIntent = "COLLECTOR" | "ARTIST";
export type AppRole = "CUSTOMER" | "ARTIST" | "ADMIN";
export type ArtistApplicationStatus = "PENDING" | "APPROVED" | "REJECTED";

export interface RegisterProfileInput {
  firstName: string;
  lastName: string;
  accountIntent: AccountIntent;
  acceptedTerms: true;
  acceptedPrivacyPolicy: true;
  marketingOptIn: boolean;
}

export interface AuthProfile {
  id: string;
  firebaseUid: string;
  email: string;
  firstName: string;
  lastName: string | null;
  displayName: string;
  emailVerified: boolean;
  status: "ACTIVE" | "SUSPENDED";
  roles: AppRole[];
  artistApplicationStatus: ArtistApplicationStatus | null;
}

export interface AuthContextValue {
  user: User | null;
  isLoading: boolean;
  signOut: () => Promise<void>;
}
