"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Metrics from "@/components/Metrics";
import PlanCard from "@/components/PlanCard";
import EmptyState from "@/components/EmptyState";
import { useFitLog } from "@/context/FitLogContext";

export default function MyPlanPage() {
  const { plan, saved, hydrated } = useFitLog();
  const [tab, setTab] = useState("plan");

  const items = tab === "plan" ? plan : saved;

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#090b0d]">
        <section className="container-fit section-fit">
          <div className="max-w-3xl">
            <p className="eyebrow">THE DAILY LOG</p>
            <h1 className="display-font mt-5 text-5xl font-bold uppercase leading-none tracking-tight text-white sm:text-6xl">
              MY PLAN
            </h1>
            <p className="mt-5 text-sm leading-7 text-zinc-400 sm:text-base">
              Cap of five lifts for today. Finish them, then load more.
            </p>
          </div>

          <div className="mt-10">
            <Metrics />
          </div>

          <div className="mt-10 border-b border-zinc-800">
            <div className="flex gap-6">
              <button
                type="button"
                onClick={() => setTab("plan")}
                className={`border-b-2 px-1 pb-4 text-sm font-black uppercase tracking-wide transition ${
                  tab === "plan"
                    ? "border-[#ccff00] text-[#ccff00]"
                    : "border-transparent text-zinc-500 hover:text-zinc-200"
                }`}
              >
                Today&apos;s Plan ({plan.length})
              </button>
              <button
                type="button"
                onClick={() => setTab("saved")}
                className={`border-b-2 px-1 pb-4 text-sm font-black uppercase tracking-wide transition ${
                  tab === "saved"
                    ? "border-[#ccff00] text-[#ccff00]"
                    : "border-transparent text-zinc-500 hover:text-zinc-200"
                }`}
              >
                Saved ({saved.length})
              </button>
            </div>
          </div>

          <div className="mt-8">
            {!hydrated ? (
              <div className="flex items-center gap-3 rounded-xl border border-zinc-800 bg-[#111518] px-5 py-6 text-sm font-semibold text-zinc-400">
                <span className="h-5 w-5 animate-spin rounded-full border-2 border-zinc-700 border-t-[#ccff00]" />
                Loading workouts…
              </div>
            ) : items.length === 0 ? (
              <EmptyState />
            ) : (
              <div className="space-y-4">
                {items.map((workout) => (
                  <PlanCard
                    key={`${tab}-${workout.id}`}
                    workout={workout}
                    mode={tab}
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
}
