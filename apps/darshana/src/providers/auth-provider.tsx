"use client";

import { createContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { onAuthStateChanged, type User } from "firebase/auth";
import { getFirebaseAuth } from "@/lib/firebase/client";
import { signOutFirebase } from "@/features/auth/services/firebase-auth.service";
import type { AuthContextValue } from "@/features/auth/types/auth.types";

export const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const auth = getFirebaseAuth();
    return onAuthStateChanged(
      auth,
      (nextUser) => {
        setUser(nextUser);
        setIsLoading(false);
      },
      () => {
        setUser(null);
        setIsLoading(false);
      },
    );
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({ user, isLoading, signOut: signOutFirebase }),
    [user, isLoading],
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
