"use client";

const requirements = [
  { label: "8–20 characters", test: (v: string) => v.length >= 8 && v.length <= 20 },
  { label: "One uppercase letter (A–Z)", test: (v: string) => /[A-Z]/.test(v) },
  { label: "One lowercase letter (a–z)", test: (v: string) => /[a-z]/.test(v) },
  { label: "One number (0–9)", test: (v: string) => /\d/.test(v) },
  { label: "One special character (@!%*$#?&)", test: (v: string) => /[@!%*$#?&]/.test(v) },
];

export function PasswordRequirements({ value }: { value: string }) {
  return (
    <div className="rounded-xl bg-stone-50 p-3">
      <p className="mb-2 text-xs font-medium text-stone-600">Password must contain:</p>
      <ul className="grid gap-1.5 sm:grid-cols-2">
        {requirements.map((item) => {
          const passed = value.length > 0 && item.test(value);
          return (
            <li
              key={item.label}
              className={`flex items-center gap-2 text-xs ${passed ? "text-emerald-700" : "text-stone-500"}`}
            >
              <span aria-hidden="true">{passed ? "✓" : "○"}</span>
              {item.label}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
