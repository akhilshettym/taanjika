"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Search } from "lucide-react";

export function SearchBar() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedQuery = query.trim();

    if (!trimmedQuery) return;
    router.push(`/search?q=${encodeURIComponent(trimmedQuery)}`);
  };

  return (
    <form
      role="search"
      onSubmit={handleSearch}
      className="group border-brand-primary/40 bg-surface-muted focus-within:border-brand-primary focus-within:ring-brand-primary hover:border-brand-primary relative flex h-10 w-full items-center rounded-full border px-1 transition-all duration-200 focus-within:ring-1"
    >
      <label htmlFor="header-search" className="sr-only">
        Search products
      </label>

      <input
        id="header-search"
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search paintings, art forms, artists..."
        className="text-brand-primary placeholder:text-brand-primary/60 w-full bg-transparent pr-2 pl-6 text-xs outline-none sm:text-xs"
        autoComplete="off"
      />

      <button
        type="submit"
        aria-label="Submit search"
        className="bg-brand-primary text-surface-muted flex h-8 w-10 shrink-0 items-center justify-center rounded-full transition-transform hover:scale-105 focus-visible:outline-none active:scale-95"
      >
        <Search size={16} strokeWidth={2.5} aria-hidden="true" />
      </button>
    </form>
  );
}
