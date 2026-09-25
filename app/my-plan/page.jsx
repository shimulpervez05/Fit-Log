"use client";

import { useState } from "react";

import Navbar from "@/components/Navbar";
import Metrics from "@/components/Metrics";
import PlanCard from "@/components/PlanCard";
import EmptyState from "@/components/EmptyState";
import { useFitLog } from "@/context/FitLogContext";

export default function MyPlanPage() {
  const {
    plan,
    saved,
    hydrated,
  } = useFitLog();

  const [activeTab, setActiveTab] = useState("plan");

  const activeItems =
    activeTab === "plan"
      ? plan
      : saved;

  if (!hydrated) {
    return (
      <>
        <Navbar />

        <main className="section">
          <div className="container">
            <div className="flex min-h-[500px] items-center justify-center">
              <div className="flex flex-col items-center gap-4">
                <div className="loading-spinner" />

                <p className="text-sm font-semibold text-[#6B6B80]">
                  Loading workouts…
                </p>
              </div>
            </div>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="section">
        <div className="container">
          {/* Header */}
          <div className="mb-10">
            <p className="section-eyebrow">
              YOUR WORKOUTS
            </p>

            <h1 className="section-title">
              MY PLAN
            </h1>

            <p className="section-subtitle">
              Cap of five lifts for today. Finish them, then load more.
            </p>
          </div>

          {/* Metrics */}
          <Metrics />

          {/* Tabs */}
          <div className="mt-12 border-b border-[#E7E5F2]">
            <div className="flex gap-7">
              <button
                type="button"
                onClick={() => setActiveTab("plan")}
                className={`relative pb-4 text-sm font-black uppercase tracking-wide transition ${
                  activeTab === "plan"
                    ? "text-[#6D5DFB]"
                    : "text-[#6B6B80] hover:text-white"
                }`}
              >
                Today&apos;s Plan

                <span
                  className={`ml-2 rounded-full px-2 py-0.5 text-[10px] ${
                    activeTab === "plan"
                      ? "bg-[#6D5DFB]/10 text-[#6D5DFB]"
                      : "bg-[#F8F7FF] text-[#6B6B80]"
                  }`}
                >
                  {plan.length}
                </span>

                {activeTab === "plan" && (
                  <span className="absolute bottom-0 left-0 h-0.5 w-full bg-[#6D5DFB]" />
                )}
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("saved")}
                className={`relative pb-4 text-sm font-black uppercase tracking-wide transition ${
                  activeTab === "saved"
                    ? "text-[#6D5DFB]"
                    : "text-[#6B6B80] hover:text-white"
                }`}
              >
                Saved

                <span
                  className={`ml-2 rounded-full px-2 py-0.5 text-[10px] ${
                    activeTab === "saved"
                      ? "bg-[#6D5DFB]/10 text-[#6D5DFB]"
                      : "bg-[#F8F7FF] text-[#6B6B80]"
                  }`}
                >
                  {saved.length}
                </span>

                {activeTab === "saved" && (
                  <span className="absolute bottom-0 left-0 h-0.5 w-full bg-[#6D5DFB]" />
                )}
              </button>
            </div>
          </div>

          {/* Workout List */}
          <div className="mt-8">
            {activeItems.length === 0 ? (
              <EmptyState mode={activeTab} />
            ) : (
              <div className="space-y-4">
                {activeItems.map((workout, index) => (
                  <PlanCard
                    key={
                      workout.id ??
                      workout._id ??
                      `${workout.name || workout.title}-${index}`
                    }
                    workout={workout}
                    mode={activeTab}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Daily Plan Limit */}
          {activeTab === "plan" && plan.length >= 5 && (
            <div className="mt-6 rounded-xl border border-[#6D5DFB]/20 bg-[#6D5DFB]/5 p-4 text-center">
              <p className="text-xs font-bold uppercase tracking-wider text-[#6D5DFB]">
                Today&apos;s plan is full
              </p>

              <p className="mt-1 text-xs text-[#6B6B80]">
                Complete or remove a lift before adding another one.
              </p>
            </div>
          )}
        </div>
      </main>
    </>
  );
}