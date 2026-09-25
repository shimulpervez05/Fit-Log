"use client";

import { Activity, Clock3, Flame } from "lucide-react";

import { useFitLog } from "@/context/FitLogContext";

export default function Metrics() {
  const { planMetrics } = useFitLog();

  const metrics = [
    {
      label: "Exercises",
      value: planMetrics.exercises,
      icon: Activity,
      suffix: "",
    },
    {
      label: "Minutes",
      value: planMetrics.minutes,
      icon: Clock3,
      suffix: "min",
    },
    {
      label: "Calories",
      value: planMetrics.calories,
      icon: Flame,
      suffix: "kcal",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      {metrics.map((metric) => {
        const Icon = metric.icon;

        return (
          <div
            key={metric.label}
            className="rounded-xl border border-zinc-800 bg-zinc-950 p-5 transition hover:border-zinc-700"
          >
            <div className="flex items-center justify-between">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#ccff00]/10 text-[#ccff00]">
                <Icon size={17} />
              </div>

              <span className="text-[9px] font-black uppercase tracking-[0.14em] text-zinc-600">
                Today
              </span>
            </div>

            <div className="mt-5 flex items-end gap-2">
              <span className="text-3xl font-black tracking-tight text-white">
                {metric.value}
              </span>

              {metric.suffix && (
                <span className="mb-1 text-xs font-bold text-zinc-600">
                  {metric.suffix}
                </span>
              )}
            </div>

            <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-zinc-500">
              {metric.label}
            </p>
          </div>
        );
      })}
    </div>
  );
}