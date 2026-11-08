"use client";

import type { AccountIntent } from "../types/auth.types";
interface Props {
  value: AccountIntent;
  onChange: (value: AccountIntent) => void;
  error?: string;
}

export function AccountIntentSelector({ value, onChange, error }: Props) {
  const options: { value: AccountIntent; title: string; description: string }[] = [
    {
      value: "COLLECTOR",
      title: "Customer / Collector",
      description: "Discover, purchase and collect Indian artwork.",
    },
    {
      value: "ARTIST",
      title: "Artist / Seller",
      description: "Apply to showcase and sell your artwork on Taanjika.",
    },
  ];
  return (
    <fieldset className="space-y-2">
      <legend className="text-sm font-medium text-stone-700">
        How would you like to use Taanjika?
      </legend>
      <div className="grid gap-3">
        {options.map((option) => (
          <label
            key={option.value}
            className={`flex cursor-pointer gap-3 rounded-xl border p-4 transition ${value === option.value ? "border-stone-900 bg-stone-50" : "border-stone-200 hover:border-stone-400"}`}
          >
            <input
              type="radio"
              name="accountIntent"
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
              className="mt-1 accent-stone-900"
            />
            <span>
              <span className="block text-sm font-semibold text-stone-900">{option.title}</span>
              <span className="mt-1 block text-xs leading-5 text-stone-500">
                {option.description}
              </span>
              {option.value === "ARTIST" ? (
                <span className="mt-2 block text-xs font-medium text-amber-700">
                  Artist access requires approval.
                </span>
              ) : null}
            </span>
          </label>
        ))}
      </div>
      {error ? (
        <p role="alert" className="text-xs text-red-600">
          {error}
        </p>
      ) : null}
    </fieldset>
  );
}
