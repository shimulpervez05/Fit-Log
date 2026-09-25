"use client";

import { ChevronDown } from "lucide-react";

export default function SortDropdown({ value, onChange }) {
  return (
    <div className="relative">
      <label htmlFor="sort-workouts" className="sr-only">Sort By</label>
      <select
        id="sort-workouts"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="focus-ring h-11 min-w-40 appearance-none rounded-lg border border-zinc-800 bg-[#111518] px-4 pr-10 text-sm font-bold text-white"
      >
        <option value="duration">Duration</option>
        <option value="calories">Calories</option>
        <option value="rating">Rating</option>
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
    </div>
  );
}
