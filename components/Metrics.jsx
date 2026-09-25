"use client";

import { Dumbbell, Flame, Timer } from "lucide-react";
import { useFitLog } from "@/context/FitLogContext";

const metrics = [
  { key: "exercises", label: "Exercises", icon: Dumbbell },
  { key: "minutes", label: "Minutes", icon: Timer },
  { key: "calories", label: "Calories", icon: Flame },
];

export default function Metrics() {
  const { planMetrics } = useFitLog();

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {metrics.map(({ key, label, icon: Icon }) => (
        <div key={key} className="card-fit p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-wider text-zinc-500">{label}</span>
            <Icon size={18} className="text-[#ccff00]" />
          </div>
          <p className="display-font mt-4 text-4xl font-bold text-white">{planMetrics[key]}</p>
        </div>
      ))}
    </div>
  );
}
