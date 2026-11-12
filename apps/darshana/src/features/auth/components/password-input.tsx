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
      <label htmlFor={id} className="text-typo-primary block text-sm font-medium">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={visible ? "text" : "password"}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`bg-surface-primary text-typo-primary placeholder:text-typo-primary/60 w-full rounded-sm border px-4 py-3 pr-20 text-sm transition outline-none focus:border-stone-500 focus:ring-2 focus:ring-stone-200 ${
            error
              ? "border-status-error focus:border-status-error"
              : "border-brand-pri/40 hover:border-brand-pri focus:border-brand-pri"
          } ${className ?? ""}`}
          {...props}
        />

        <button
          type="button"
          onClick={() => setVisible((value) => !value)}
          className="text-typo-secondary hover:text-typo-secondary/50 absolute inset-y-0 right-4 flex items-center text-xs font-medium uppercase transition-colors"
          aria-label={visible ? "Hide password" : "Show password"}
        >
          {visible ? "Hide" : "Show"}
        </button>
      </div>

      {error ? (
        <p id={`${id}-error`} role="alert" className="text-status-error text-xs">
          {error}
        </p>
      ) : null}
    </div>
  );
}
