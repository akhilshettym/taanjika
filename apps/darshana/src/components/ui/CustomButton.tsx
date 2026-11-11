import React from "react";
import Link from "next/link";

export type CustomButtonProps = {
    variant?: "default" | "secondary";
    href?: string;
    children: React.ReactNode;
    className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export function CustomButton({ variant = "default", href, children, className = "", ...props }: CustomButtonProps) {
    const isDefault = variant === "default";

    const baseStyles = "inline-flex items-center justify-center rounded-md px-4 py-2.5 text-xs font-semibold tracking-wider transition-all duration-200 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";

    const colorStyles = isDefault
        ? "bg-brand-primary border border-transparent shadow-sm hover:bg-brand-primary/70 hover:shadow-md focus-visible:ring-brand-primary"
        : "bg-surface-secondary border border-[var(--border-primary,#741f2b)]/30 hover:bg-black/5 hover:border-[var(--border-primary,#741f2b)] focus-visible:ring-typo-primary";

    const combinedClasses = `${baseStyles} ${colorStyles} ${className}`.trim();

    if (href) {
        return (
            <Link href={href} className={combinedClasses}>
                {children}
            </Link>
        );
    }

    return (
        <button className={combinedClasses} {...props}>
            {children}
        </button>
    );
}