import type { ComponentPropsWithRef } from "react";

interface AuthFieldProps extends ComponentPropsWithRef<"input"> {
  id: string;
  label: string;
  error?: string;
}

export function AuthField({ id, label, error, className, ...props }: AuthFieldProps) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-sm font-medium text-typo-primary">
        {label}
      </label>

      <input id={id}
        aria-invalid={Boolean(error)} aria-describedby={error ? `${id}-error` : undefined}
        className={`w-full rounded-sm border bg-surface-primary px-4 py-3 text-sm text-typo-primary transition outline-none placeholder:text-typo-primary/60 focus:outline-none focus:ring-0 ${error
          ? "border-status-error focus:border-status-error"
          : "border-brand-pri/40 hover:border-brand-pri focus:border-brand-pri"
          } ${className ?? ""}`}
        {...props} />

      {error ? (
        <p id={`${id}-error`} role="alert" className="text-xs text-status-error">
          {error}
        </p>
      ) : null}
    </div>
  );
}
