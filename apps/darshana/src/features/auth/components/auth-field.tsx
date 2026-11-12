import type { ComponentPropsWithRef } from "react";

interface AuthFieldProps extends ComponentPropsWithRef<"input"> {
  id: string;
  label: string;
  error?: string;
}

export function AuthField({ id, label, error, className, ...props }: AuthFieldProps) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="text-typo-primary block text-sm font-medium">
        {label}
      </label>

      <input
        id={id}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`bg-surface-primary text-typo-primary placeholder:text-typo-primary/60 w-full rounded-sm border px-4 py-3 text-sm transition outline-none focus:ring-0 focus:outline-none ${
          error
            ? "border-status-error focus:border-status-error"
            : "border-brand-pri/40 hover:border-brand-pri focus:border-brand-pri"
        } ${className ?? ""}`}
        {...props}
      />

      {error ? (
        <p id={`${id}-error`} role="alert" className="text-status-error text-xs">
          {error}
        </p>
      ) : null}
    </div>
  );
}
