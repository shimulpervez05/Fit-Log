"use client";

import { ChevronDown } from "lucide-react";

export default function SortDropdown({
  value = "duration",
  onChange,
}) {
  return (
    <div className="relative">
      <label htmlFor="workout-sort" className="sr-only">
        Sort workouts
      </label>

      <select
        id="workout-sort"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-11 min-w-[170px] cursor-pointer rounded-lg border border-[#E7E5F2] bg-white px-4 pr-10 text-sm font-semibold text-[#17172B] outline-none transition hover:border-[#D8D5EC] focus:border-[#6D5DFB]"
      >
        <option value="duration">Duration</option>
        <option value="calories">Calories</option>
        <option value="rating">Rating</option>
      </select>

      <ChevronDown
        size={16}
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#6B6B80]"
      />
    </div>
  );
}