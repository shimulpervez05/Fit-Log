import Link from "next/link";
import { Dumbbell } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-800 bg-zinc-950">
      <div className="container flex min-h-[100px] flex-col items-center justify-between gap-5 py-7 sm:flex-row">
        {/* Logo */}
        <Link
          href="/"
          className="group flex items-center gap-3"
          aria-label="FitLog home"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#ccff00] text-zinc-950 transition-transform duration-200 group-hover:scale-105">
            <Dumbbell size={19} strokeWidth={2.5} />
          </span>

          <span className="text-lg font-black tracking-tight text-white">
            FIT<span className="text-[#ccff00]">LOG</span>
          </span>
        </Link>

        {/* Copyright */}
        <p className="text-center text-xs font-medium text-zinc-500 sm:text-right">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}