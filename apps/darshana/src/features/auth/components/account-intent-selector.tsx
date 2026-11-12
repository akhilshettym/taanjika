"use client";

import { NotebookPen } from "lucide-react";
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
      description:
        "Explore diverse art forms, uncover their rich histories, and build your personal collection. Acquire authenticated artworks directly from master studios and contemporary artists.",
    },
    {
      value: "ARTIST",
      title: "Artist / Seller",
      description:
        "Apply for an artist or seller account to curate your own digital gallery on Taanjika. Showcase your creations to a global audience of collectors and sell your work seamlessly.",
    },
  ];

  return (
    <fieldset className="space-y-2">
      <legend className="text-typo-primary text-sm font-medium">
        How would you like to use Taanjika?
      </legend>

      <div className="grid gap-3">
        {options.map((option) => (
          <label
            key={option.value}
            className={`flex cursor-pointer gap-3 rounded-sm border p-4 transition ${value === option.value ? "border-tertiary bg-surface-secondary" : "border-primary bg-color-disabled hover:border-secondary"}`}
          >
            <input
              type="radio"
              name="accountIntent"
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
              className="accent-brand-secondary mt-1"
            />

            <span>
              <span className="text-typo-primary block text-sm font-semibold">{option.title}</span>

              <span className="text-typo-tertiary mt-1 block text-xs leading-4.5">
                {option.description}
              </span>

              {option.value === "ARTIST" ? (
                <span className="text-typo-primary mt-2 inline-flex items-center gap-1.5 text-xs font-medium">
                  <NotebookPen size={16} className="size-3.5 shrink-0" strokeWidth={2} />
                  <span>Artist access requires approval from admin.</span>
                </span>
              ) : null}
            </span>
          </label>
        ))}
      </div>

      {error ? (
        <p role="alert" className="text-status-error text-xs">
          {error}
        </p>
      ) : null}
    </fieldset>
  );
}
