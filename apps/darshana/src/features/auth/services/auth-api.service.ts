import type { User } from "firebase/auth";
import type { AuthProfile, RegisterProfileInput } from "../types/auth.types";

const API_BASE_URL = process.env.NEXT_PUBLIC_MOOLA_API_URL;
if (!API_BASE_URL) throw new Error("NEXT_PUBLIC_MOOLA_API_URL is missing.");

export class AuthApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
  ) {
    super(message);
    this.name = "AuthApiError";
  }
}

async function request<T>(user: User, path: string, init: RequestInit = {}): Promise<T> {
  const token = await user.getIdToken();
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...init.headers,
    },
    cache: "no-store",
  });
  const payload = (await response.json().catch(() => null)) as {
    message?: string | string[];
  } | null;
  if (!response.ok) {
    const message = Array.isArray(payload?.message) ? payload.message.join(", ") : payload?.message;
    throw new AuthApiError(message ?? "The request could not be completed.", response.status);
  }
  return payload as T;
}

export const authApi = {
  registerProfile(user: User, input: RegisterProfileInput): Promise<AuthProfile> {
    return request<AuthProfile>(user, "/auth/register", {
      method: "POST",
      body: JSON.stringify(input),
    });
  },
  syncProfile(user: User, input: RegisterProfileInput): Promise<AuthProfile> {
    return request<AuthProfile>(user, "/auth/sync", {
      method: "POST",
      body: JSON.stringify(input),
    });
  },
  getMe(user: User): Promise<AuthProfile> {
    return request<AuthProfile>(user, "/auth/me");
  },
};
