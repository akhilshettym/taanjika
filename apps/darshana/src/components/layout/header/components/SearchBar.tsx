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
    <form role="search"
      onSubmit={handleSearch}
      className="group relative flex h-10 w-full items-center rounded-full border border-brand-primary/40 bg-surface-muted px-1 transition-all duration-200 focus-within:border-brand-primary focus-within:ring-1 focus-within:ring-brand-primary hover:border-brand-primary">
      <label htmlFor="header-search" className="sr-only">
        Search products
      </label>

      <input id="header-search" type="search" value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search paintings, art forms, artists..."
        className="w-full bg-transparent pr-2 pl-6 text-xs sm:text-xs text-brand-primary outline-none placeholder:text-brand-primary/60" autoComplete="off" />

      <button type="submit" aria-label="Submit search"
        className="flex h-8 w-10 shrink-0 items-center justify-center rounded-full bg-brand-primary text-surface-muted transition-transform hover:scale-105 active:scale-95 focus-visible:outline-none">
        <Search size={16} strokeWidth={2.5} aria-hidden="true" />
      </button>
    </form>
  );
}