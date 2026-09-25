"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, Dumbbell } from "lucide-react";
import { useFitLog } from "@/context/FitLogContext";

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const { planCount, savedCount } = useFitLog();

  const isWorkoutActive =
    pathname === "/" || pathname.startsWith("/workout");

  const isPlanActive = pathname.startsWith("/my-plan");

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-[#E7E5F2]/80 bg-white/95 backdrop-blur-md">
      <div className="container">
        <nav className="flex h-[72px] items-center justify-between gap-6">
          {/* Logo */}
          <Link
            href="/"
            onClick={closeMenu}
            className="flex shrink-0 items-center gap-2"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#6D5DFB] text-white">
              <Dumbbell size={19} strokeWidth={2.5} />
            </span>

            <span className="text-lg font-black tracking-tight text-white">
              FIT<span className="text-[#6D5DFB]">LOG</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-8 md:flex">
            <Link
              href="/"
              className={`relative py-2 text-sm font-semibold transition ${
                isWorkoutActive
                  ? "text-[#6D5DFB]"
                  : "text-[#55556B] hover:text-white"
              }`}
            >
              Workout

              {isWorkoutActive && (
                <span className="absolute bottom-0 left-0 h-0.5 w-full rounded-full bg-[#6D5DFB]" />
              )}
            </Link>

            <Link
              href="/my-plan"
              className={`relative py-2 text-sm font-semibold transition ${
                isPlanActive
                  ? "text-[#6D5DFB]"
                  : "text-[#55556B] hover:text-white"
              }`}
            >
              My Plan

              {isPlanActive && (
                <span className="absolute bottom-0 left-0 h-0.5 w-full rounded-full bg-[#6D5DFB]" />
              )}
            </Link>
          </div>

          {/* Desktop Counters */}
          <div className="hidden items-center gap-2 sm:flex">
            <Link
              href="/my-plan"
              className="flex items-center gap-2 rounded-full bg-[#6D5DFB] px-4 py-2 text-xs font-black uppercase tracking-wide text-white transition hover:bg-[#5548D9]"
            >
              <span>Plan</span>

              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-white px-1.5 text-[10px] font-bold text-[#6D5DFB]">
                {planCount}
              </span>
            </Link>

            <Link
              href="/my-plan"
              className="flex items-center gap-2 rounded-full border border-[#D8D5EC] px-4 py-2 text-xs font-black uppercase tracking-wide text-[#17172B] transition hover:border-[#6D5DFB] hover:text-[#6D5DFB]"
            >
              <span>Saved</span>

              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#F0EEFF] px-1.5 text-[10px] font-bold text-[#17172B]">
                {savedCount}
              </span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMenuOpen((current) => !current)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#E7E5F2] text-[#17172B] transition hover:border-[#6D5DFB] hover:text-[#6D5DFB] sm:hidden"
          >
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </nav>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="border-t border-[#E7E5F2] py-5 sm:hidden">
            <div className="flex flex-col gap-2">
              <Link
                href="/"
                onClick={closeMenu}
                className={`rounded-lg px-4 py-3 text-sm font-semibold transition ${
                  isWorkoutActive
                    ? "bg-[#6D5DFB]/10 text-[#6D5DFB]"
                    : "text-[#55556B] hover:bg-[#F8F7FF] hover:text-white"
                }`}
              >
                Workout
              </Link>

              <Link
                href="/my-plan"
                onClick={closeMenu}
                className={`rounded-lg px-4 py-3 text-sm font-semibold transition ${
                  isPlanActive
                    ? "bg-[#6D5DFB]/10 text-[#6D5DFB]"
                    : "text-[#55556B] hover:bg-[#F8F7FF] hover:text-white"
                }`}
              >
                My Plan
              </Link>

              <div className="mt-3 flex gap-2 border-t border-[#E7E5F2] pt-4">
                <Link
                  href="/my-plan"
                  onClick={closeMenu}
                  className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#6D5DFB] px-4 py-2.5 text-xs font-black uppercase tracking-wide text-white"
                >
                  Plan
                  <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-white px-1.5 text-[10px] text-[#6D5DFB]">
                    {planCount}
                  </span>
                </Link>

                <Link
                  href="/my-plan"
                  onClick={closeMenu}
                  className="flex flex-1 items-center justify-center gap-2 rounded-full border border-[#D8D5EC] px-4 py-2.5 text-xs font-black uppercase tracking-wide text-[#17172B]"
                >
                  Saved
                  <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#F0EEFF] px-1.5 text-[10px] text-[#17172B]">
                    {savedCount}
                  </span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}