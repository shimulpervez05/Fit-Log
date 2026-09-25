import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function EmptyState() {
  return (
    <div className="card-fit flex min-h-72 flex-col items-center justify-center px-6 py-12 text-center">
      <p className="text-xs font-black uppercase tracking-[0.2em] text-[#ccff00]">NOTHING HERE YET</p>
      <p className="mt-3 max-w-md text-sm leading-6 text-zinc-500">
        Browse the library and add a lift to get today moving.
      </p>
      <Link
        href="/"
        className="focus-ring mt-6 inline-flex items-center gap-2 rounded-lg bg-[#ccff00] px-5 py-3 text-xs font-black uppercase text-black hover:bg-[#b7e600]"
      >
        Go to workouts <ArrowRight size={15} />
      </Link>
    </div>
  );
}
