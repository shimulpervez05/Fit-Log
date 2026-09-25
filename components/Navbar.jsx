"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dumbbell, Menu, X } from "lucide-react";
import { useState } from "react";
import { useFitLog } from "@/context/FitLogContext";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { plan, saved } = useFitLog();

  const isWorkout = pathname === "/" || pathname.startsWith("/workout");

  const close = () => setOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800/80 bg-[#090b0d]/95 backdrop-blur">
      <nav className="container-fit flex h-16 items-center justify-between gap-5">
        <Link href="/" onClick={close} className="focus-ring flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#ccff00] text-black">
            <Dumbbell size={19} strokeWidth={2.8} />
          </span>
          <span className="display-font text-xl font-bold tracking-wide text-white">
            FIT<span className="text-[#ccff00]">LOG</span>
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <Link
            href="/"
            className={`focus-ring border-b-2 py-5 text-sm font-bold ${
              isWorkout
                ? "border-[#ccff00] text-white"
                : "border-transparent text-zinc-400 hover:text-white"
            }`}
          >
            Workout
          </Link>
          <Link
            href="/my-plan"
            className={`focus-ring border-b-2 py-5 text-sm font-bold ${
              pathname === "/my-plan"
                ? "border-[#ccff00] text-white"
                : "border-transparent text-zinc-400 hover:text-white"
            }`}
          >
            My Plan
          </Link>
        </div>

        <div className="hidden items-center gap-2 sm:flex">
          <Link
            href="/my-plan"
            className="focus-ring rounded-full bg-[#ccff00] px-4 py-2 text-xs font-black uppercase text-black"
          >
            Plan <span className="ml-1 rounded-full bg-black/10 px-1.5">{plan.length}</span>
          </Link>
          <Link
            href="/my-plan"
            className="focus-ring rounded-full border border-zinc-700 px-4 py-2 text-xs font-black uppercase text-white"
          >
            Saved <span className="ml-1 rounded-full bg-zinc-800 px-1.5">{saved.length}</span>
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-label="Toggle navigation"
          className="focus-ring rounded-lg p-2 text-white md:hidden"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-zinc-800 bg-[#0d1113] px-4 py-4 md:hidden">
          <div className="container-fit flex flex-col gap-2">
            <Link
              href="/"
              onClick={close}
              className="rounded-lg px-3 py-3 text-sm font-bold text-white hover:bg-zinc-900"
            >
              Workout
            </Link>
            <Link
              href="/my-plan"
              onClick={close}
              className="rounded-lg px-3 py-3 text-sm font-bold text-white hover:bg-zinc-900"
            >
              My Plan
            </Link>
            <div className="mt-2 flex gap-2 border-t border-zinc-800 pt-4">
              <Link href="/my-plan" onClick={close} className="flex-1 rounded-full bg-[#ccff00] px-4 py-2 text-center text-xs font-black text-black">
                PLAN {plan.length}
              </Link>
              <Link href="/my-plan" onClick={close} className="flex-1 rounded-full border border-zinc-700 px-4 py-2 text-center text-xs font-black text-white">
                SAVED {saved.length}
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
