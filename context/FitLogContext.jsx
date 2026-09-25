"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

const FitLogContext = createContext(null);
const PLAN_KEY = "fitlog-todays-plan";
const SAVED_KEY = "fitlog-saved-workouts";

function normalize(workout) {
  return {
    ...workout,
    id: workout.id ?? workout._id,
    caloriesBurned: workout.caloriesBurned ?? workout.calories ?? 0,
    duration: workout.duration ?? workout.durationMinutes ?? 0,
    completed: Boolean(workout.completed),
  };
}

export function FitLogProvider({ children }) {
  const [plan, setPlan] = useState([]);
  const [saved, setSaved] = useState([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const storedPlan = JSON.parse(localStorage.getItem(PLAN_KEY) || "[]");
      const storedSaved = JSON.parse(localStorage.getItem(SAVED_KEY) || "[]");
      setPlan(Array.isArray(storedPlan) ? storedPlan : []);
      setSaved(Array.isArray(storedSaved) ? storedSaved : []);
    } catch {
      setPlan([]);
      setSaved([]);
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (hydrated) localStorage.setItem(PLAN_KEY, JSON.stringify(plan));
  }, [plan, hydrated]);

  useEffect(() => {
    if (hydrated) localStorage.setItem(SAVED_KEY, JSON.stringify(saved));
  }, [saved, hydrated]);

  function addToPlan(workout) {
    const item = normalize(workout);
    if (plan.some((entry) => entry.id === item.id)) {
      return { ok: false, message: "Already in today's plan" };
    }
    if (plan.length >= 5) {
      return { ok: false, message: "Today's plan is full" };
    }
    setPlan((current) => [...current, item]);
    return { ok: true, message: "Added to today's plan" };
  }

  function removeFromPlan(id) {
    setPlan((current) => current.filter((item) => item.id !== id));
  }

  function toggleComplete(id) {
    setPlan((current) =>
      current.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  }

  function saveWorkout(workout) {
    const item = normalize(workout);
    if (saved.some((entry) => entry.id === item.id)) {
      return { ok: false, message: "Already saved for later" };
    }
    setSaved((current) => [...current, item]);
    return { ok: true, message: "Saved for later" };
  }

  function removeSaved(id) {
    setSaved((current) => current.filter((item) => item.id !== id));
  }

  const planMetrics = useMemo(
    () => ({
      exercises: plan.length,
      minutes: plan.reduce((sum, item) => sum + Number(item.duration || 0), 0),
      calories: plan.reduce((sum, item) => sum + Number(item.caloriesBurned || 0), 0),
    }),
    [plan]
  );

  const value = {
    plan,
    saved,
    hydrated,
    planMetrics,
    addToPlan,
    removeFromPlan,
    toggleComplete,
    saveWorkout,
    removeSaved,
    isInPlan: (id) => plan.some((item) => item.id === id),
    isSaved: (id) => saved.some((item) => item.id === id),
  };

  return <FitLogContext.Provider value={value}>{children}</FitLogContext.Provider>;
}

export function useFitLog() {
  const context = useContext(FitLogContext);
  if (!context) throw new Error("useFitLog must be used inside FitLogProvider");
  return context;
}
