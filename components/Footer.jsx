import { Dumbbell } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-800 bg-[#060708]">
      <div className="container-fit flex flex-col gap-5 py-8 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#ccff00] text-black">
            <Dumbbell size={18} />
          </span>
          <span className="display-font text-xl font-bold tracking-wide text-white">
            FIT<span className="text-[#ccff00]">LOG</span>
          </span>
        </div>
        <p className="text-xs font-medium text-zinc-500">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}
