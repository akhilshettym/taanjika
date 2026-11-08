
import type { User } from "firebase/auth";

import type {
  AuthProfile,
  RegisterProfileInput,
} from "../types/auth.types";

/**
 * Reads the Moola API URL only when an API request is made.
 *
 * This prevents environment configuration errors during
 * Next.js module imports and static page prerendering.
 */
function getApiBaseUrl(): string {
  const apiUrl = process.env.NEXT_PUBLIC_MOOLA_API_URL?.trim();

  if (!apiUrl) {
    throw new Error(
      "NEXT_PUBLIC_MOOLA_API_URL is missing. Configure it in your Darshana environment.",
    );
  }

  let parsedUrl: URL;

  try {
    parsedUrl = new URL(apiUrl);
  } catch {
    throw new Error(
      "NEXT_PUBLIC_MOOLA_API_URL must be a valid absolute URL.",
    );
  }

  if (parsedUrl.protocol !== "http:" && parsedUrl.protocol !== "https:") {
    throw new Error(
      "NEXT_PUBLIC_MOOLA_API_URL must use HTTP or HTTPS.",
    );
  }

  return apiUrl.replace(/\/+$/, "");
}

/**
 * Standard API error class.
 */
export class AuthApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly code?: string,
  ) {
    super(message);
    this.name = "AuthApiError";
    Object.setPrototypeOf(this, AuthApiError.prototype);
  }
}

interface ApiErrorPayload {
  message?: string | string[];
  error?: string;
  code?: string;
}

/**
 * Extracts a readable message from the Moola API response.
 */
function getErrorMessage(payload: unknown): {
  message?: string;
  code?: string;
} {
  if (!payload || typeof payload !== "object") {
    return {};
  }

  const error = payload as ApiErrorPayload;

  const message = Array.isArray(error.message)
    ? error.message.join(", ")
    : error.message;

  return {
    message,
    code: error.code,
  };
}

/**
 * Common authenticated API request.
 *
 * Firebase automatically refreshes the ID token when necessary.
 * The actual token is never stored manually by this service.
 */
async function request<T>(
  user: User,
  path: string,
  init: RequestInit = {},
): Promise<T> {
  const apiBaseUrl = getApiBaseUrl();

  // Obtain a valid Firebase ID token.
  const token = await user.getIdToken();

  // Normalize the API path.
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  // Build headers safely, supporting Headers, tuples and plain objects.
  const headers = new Headers(init.headers);

  headers.set("Accept", "application/json");
  headers.set("Authorization", `Bearer ${token}`);

  if (init.body !== undefined && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  let response: Response;

  try {
    response = await fetch(`${apiBaseUrl}${normalizedPath}`, {
      ...init,
      headers,
      cache: "no-store",
    });
  } catch {
    throw new AuthApiError(
      "Unable to connect to Taanjika services. Please check your connection and try again.",
      0,
      "NETWORK_ERROR",
    );
  }

  // Handle empty responses safely.
  if (response.status === 204) {
    if (!response.ok) {
      throw new AuthApiError(
        "The request could not be completed.",
        response.status,
      );
    }

    return undefined as T;
  }

  // Read the response body once.
  const responseText = await response.text();

  let payload: unknown = null;

  if (responseText) {
    try {
      payload = JSON.parse(responseText);
    } catch {
      payload = null;
    }
  }

  // Handle unsuccessful API responses.
  if (!response.ok) {
    const errorDetails = getErrorMessage(payload);

    throw new AuthApiError(
      errorDetails.message ??
        "The request could not be completed. Please try again.",
      response.status,
      errorDetails.code,
    );
  }

  return payload as T;
}

/**
 * Authentication API methods.
 */
export const authApi = {
  /**
   * Registers a new user profile in Moola.
   */
  registerProfile(
    user: User,
    input: RegisterProfileInput,
  ): Promise<AuthProfile> {
    return request<AuthProfile>(user, "/auth/register", {
      method: "POST",
      body: JSON.stringify(input),
    });
  },

  /**
   * Synchronizes an existing Firebase user with Moola.
   * Useful when Firebase account creation succeeds but
   * PostgreSQL profile creation previously failed.
   */
  syncProfile(
    user: User,
    input: RegisterProfileInput,
  ): Promise<AuthProfile> {
    return request<AuthProfile>(user, "/auth/sync", {
      method: "POST",
      body: JSON.stringify(input),
    });
  },

  /**
   * Fetches the currently authenticated user's profile.
   */
  getMe(user: User): Promise<AuthProfile> {
    return request<AuthProfile>(user, "/auth/me", {
      method: "GET",
    });
  },
};
