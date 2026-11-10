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
      <label htmlFor={id} className="block text-sm font-medium text-stone-700">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={visible ? "text" : "password"}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`w-full rounded-xl border bg-white px-4 py-3 pr-20 text-sm text-stone-900 transition outline-none placeholder:text-stone-400 focus:border-stone-500 focus:ring-2 focus:ring-stone-200 ${error ? "border-red-400" : "border-stone-200"} ${className ?? ""}`}
          {...props}
        />
        <button
          type="button"
          onClick={() => setVisible((value) => !value)}
          className="absolute inset-y-0 right-3 text-xs font-medium text-stone-500 hover:text-stone-900"
          aria-label={visible ? "Hide password" : "Show password"}
        >
          {visible ? "Hide" : "Show"}
        </button>
      </div>
      {error ? (
        <p id={`${id}-error`} role="alert" className="text-xs text-red-600">
          {error}
        </p>
      ) : null}
    </div>
  );
}
