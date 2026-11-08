import type { ComponentPropsWithRef } from "react";

interface AuthFieldProps extends ComponentPropsWithRef<"input"> {
  id: string;
  label: string;
  error?: string;
}

export function AuthField({ id, label, error, className, ...props }: AuthFieldProps) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-sm font-medium text-stone-700">
        {label}
      </label>
      <input
        id={id}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`w-full rounded-xl border bg-white px-4 py-3 text-sm text-stone-900 transition outline-none placeholder:text-stone-400 focus:border-stone-500 focus:ring-2 focus:ring-stone-200 ${error ? "border-red-400" : "border-stone-200"} ${className ?? ""}`}
        {...props}
      />
      {error ? (
        <p id={`${id}-error`} role="alert" className="text-xs text-red-600">
          {error}
        </p>
      ) : null}
    </div>
  );
}
