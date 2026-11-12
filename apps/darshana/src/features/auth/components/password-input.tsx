"use client";

import { useState, type ComponentPropsWithRef } from "react";

interface PasswordInputProps extends Omit<ComponentPropsWithRef<"input">, "type"> {
  id: string;
  label: string;
  error?: string;
}

export function PasswordInput({ id, label, error, className, ...props }: PasswordInputProps) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-sm font-medium text-typo-primary">
        {label}
      </label>
      <div className="relative">
        <input id={id} type={visible ? "text" : "password"}
          aria-invalid={Boolean(error)} aria-describedby={error ? `${id}-error` : undefined}
          className={`w-full rounded-sm border bg-surface-primary px-4 py-3 pr-20 text-sm text-typo-primary transition outline-none placeholder:text-typo-primary/60 focus:border-stone-500 focus:ring-2 focus:ring-stone-200 ${error
            ? "border-status-error focus:border-status-error"
            : "border-brand-pri/40 hover:border-brand-pri focus:border-brand-pri"
            } ${className ?? ""}`}
          {...props} />

        <button type="button" onClick={() => setVisible((value) => !value)}
          className="absolute inset-y-0 right-4 flex items-center text-xs font-medium text-typo-secondary uppercase transition-colors hover:text-typo-secondary/50"
          aria-label={visible ? "Hide password" : "Show password"}>
          {visible ? "Hide" : "Show"}
        </button>
      </div>

      {error ? (
        <p id={`${id}-error`} role="alert" className="text-xs text-status-error">
          {error}
        </p>
      ) : null}
    </div>
  );
}
