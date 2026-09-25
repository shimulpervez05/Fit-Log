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
            className="rounded-xl border border-[#E7E5F2] bg-white p-5 transition hover:border-[#D8D5EC]"
          >
            <div className="flex items-center justify-between">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#6D5DFB]/10 text-[#6D5DFB]">
                <Icon size={17} />
              </div>

              <span className="text-[9px] font-black uppercase tracking-[0.14em] text-[#6B6B80]">
                Today
              </span>
            </div>

            <div className="mt-5 flex items-end gap-2">
              <span className="text-3xl font-black tracking-tight text-white">
                {metric.value}
              </span>

              {metric.suffix && (
                <span className="mb-1 text-xs font-bold text-[#6B6B80]">
                  {metric.suffix}
                </span>
              )}
            </div>

            <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-[#6B6B80]">
              {metric.label}
            </p>
          </div>
        );
      })}
    </div>
  );
}