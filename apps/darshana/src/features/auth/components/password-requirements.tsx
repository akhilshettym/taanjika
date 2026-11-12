"use client";

import { Check, Circle } from "lucide-react";

const requirements = [
  { label: "8-20 characters", test: (v: string) => v.length >= 8 && v.length <= 20 },
  { label: "One uppercase letter (A-Z)", test: (v: string) => /[A-Z]/.test(v) },
  { label: "One lowercase letter (a-z)", test: (v: string) => /[a-z]/.test(v) },
  { label: "One number (0-9)", test: (v: string) => /\d/.test(v) },
  { label: "One special character (@!%*$#?&)", test: (v: string) => /[@!%*$#?&]/.test(v) },
];

export function PasswordRequirements({ value }: { value: string }) {
  return (
    <div className="rounded-xl bg-surface-primary p-5">
      <p className="pb-4 text-xs font-medium text-typo-secondary">Password must contain:</p>
      <ul className="grid gap-1.5 sm:grid-cols-2">
        {requirements.map((item) => {
          const passed = value.length > 0 && item.test(value);
          return (
            <li key={item.label} className={`flex items-center gap-2 text-xs ${passed ? "text-status-success" : "text-typo-tertiary"}`}>
              <span aria-hidden="true" className="inline-flex items-center">
                {passed ? (
                  <Check className="h-4 w-4 shrink-0" />
                ) : (
                  <Circle className="h-4 w-4 shrink-0" />
                )}
              </span>
              {item.label}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
