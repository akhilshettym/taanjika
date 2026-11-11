"use client";

import Link from "next/link";
import { UserRound } from "lucide-react";
import { CustomButton } from "@/components/ui/CustomButton";

type AccountActionsProps = {
  isAuthenticated?: boolean;
};

export function AccountActions({ isAuthenticated = false }: AccountActionsProps) {
  if (isAuthenticated) {
    return (
      <Link href="/account" className="flex items-center gap-2 text-sm font-medium text-typo-primary transition-colors hover:text-brand-primary">
        <UserRound size={20} className="shrink-0" aria-hidden="true" />
        <span>My Account</span>
      </Link>
    );
  }

  return (
    <div className="group relative inline-block">
      <Link href="/sign-in" className="flex items-center gap-2.5 text-xs text-typo-primary transition-colors hover:text-brand-primary focus-visible:outline-none">
        <UserRound size={22} className="shrink-0 transition-transform duration-200 group-hover:scale-105" aria-hidden="true" />
        <div className="flex flex-col text-left font-medium leading-tight">
          <span className="whitespace-nowrap">Sign in /</span>
          <span className="whitespace-nowrap font-semibold">Register</span>
        </div>
      </Link>

      <div className="invisible absolute right-0 top-full z-50 pt-3 opacity-0 transition-all duration-200 ease-out group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
        <div className="w-80 rounded-md border border-[var(--border-primary,#741f2b)]/20 bg-surface-secondary p-5 shadow-2xl backdrop-blur-sm transition-all transform translate-y-1 group-hover:translate-y-0">

          <div className="flex flex-col items-stretch text-center text-typo-utility">
            <CustomButton href="/sign-in" variant="default" className="w-full uppercase">
              Sign In
            </CustomButton>
            <p className="text-[10px] text-typo-secondary">
              Access your saved artworks and order tracking
            </p>
          </div>

          <div className="relative my-5 flex items-center justify-center">
            <div className="w-full border-t-2 border-[var(--border-primary,#741f2b)]" />
            <span className="absolute bg-surface-secondary px-3 text-[10px] font-bold tracking-widest uppercase text-typo-secondary/80">
              New Customer?
            </span>
          </div>

          <div className="flex flex-col items-stretch text-center text-typo-utility">
            <CustomButton href="/register" variant="default" className="w-full uppercase">
              Create Account
            </CustomButton>
            <p className="text-[11px] text-typo-secondary">
              Enjoy exclusive access, curated for you.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
