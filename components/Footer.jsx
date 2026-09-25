import Link from "next/link";
import { Dumbbell } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-[#E7E5F2] bg-white">
      <div className="container flex min-h-[100px] flex-col items-center justify-between gap-5 py-7 sm:flex-row">
        {/* Logo */}
        <Link
          href="/"
          className="group flex items-center gap-3"
          aria-label="FitLog home"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#6D5DFB] text-white transition-transform duration-200 group-hover:scale-105">
            <Dumbbell size={19} strokeWidth={2.5} />
          </span>

          <span className="text-lg font-black tracking-tight text-white">
            FIT<span className="text-[#6D5DFB]">LOG</span>
          </span>
        </Link>

        {/* Copyright */}
        <p className="text-center text-xs font-medium text-[#6B6B80] sm:text-right">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}