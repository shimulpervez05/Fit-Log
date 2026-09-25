"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

const FitLogContext = createContext(null);

const PLAN_STORAGE_KEY = "fitlog-todays-plan";
const SAVED_STORAGE_KEY = "fitlog-saved-workouts";

export function FitLogProvider({ children }) {
  const [plan, setPlan] = useState([]);
  const [saved, setSaved] = useState([]);
  const [hydrated, setHydrated] = useState(false);

  // Load saved data from localStorage
  useEffect(() => {
    try {
      const storedPlan = localStorage.getItem(PLAN_STORAGE_KEY);
      const storedSaved = localStorage.getItem(SAVED_STORAGE_KEY);

      if (storedPlan) {
        setPlan(JSON.parse(storedPlan));
      }

      if (storedSaved) {
        setSaved(JSON.parse(storedSaved));
      }
    } catch (error) {
      console.error("Failed to load FitLog data:", error);
    } finally {
      setHydrated(true);
    }
  }, []);

  // Save today's plan
  useEffect(() => {
    if (!hydrated) return;

    localStorage.setItem(PLAN_STORAGE_KEY, JSON.stringify(plan));
  }, [plan, hydrated]);

  // Save saved workouts
  useEffect(() => {
    if (!hydrated) return;

    localStorage.setItem(SAVED_STORAGE_KEY, JSON.stringify(saved));
  }, [saved, hydrated]);

  // Add workout to today's plan
  const addToPlan = (workout) => {
    if (!workout) {
      return {
        success: false,
        message: "Workout not found.",
      };
    }

    if (plan.length >= 5) {
      return {
        success: false,
        message: "Today's plan is full. You can add up to five lifts.",
      };
    }

    const alreadyExists = plan.some(
      (item) => String(item.id) === String(workout.id)
    );

    if (alreadyExists) {
      return {
        success: false,
        message: "This workout is already in today's plan.",
      };
    }

    setPlan((currentPlan) => [
      ...currentPlan,
      {
        ...workout,
        completed: false,
      },
    ]);

    return {
      success: true,
      message: "Added to today's plan.",
    };
  };

  // Remove workout from today's plan
  const removeFromPlan = (workoutId) => {
    setPlan((currentPlan) =>
      currentPlan.filter(
        (item) => String(item.id) !== String(workoutId)
      )
    );
  };

  // Mark workout as completed / not completed
  const toggleComplete = (workoutId) => {
    setPlan((currentPlan) =>
      currentPlan.map((item) =>
        String(item.id) === String(workoutId)
          ? {
              ...item,
              completed: !item.completed,
            }
          : item
      )
    );
  };

  // Save workout for later
  const saveWorkout = (workout) => {
    if (!workout) {
      return {
        success: false,
        message: "Workout not found.",
      };
    }

    const alreadySaved = saved.some(
      (item) => String(item.id) === String(workout.id)
    );

    if (alreadySaved) {
      return {
        success: false,
        message: "This workout is already saved.",
      };
    }

    setSaved((currentSaved) => [...currentSaved, workout]);

    return {
      success: true,
      message: "Saved for later.",
    };
  };

  // Remove workout from saved list
  const removeSaved = (workoutId) => {
    setSaved((currentSaved) =>
      currentSaved.filter(
        (item) => String(item.id) !== String(workoutId)
      )
    );
  };

  // Check whether workout is already in today's plan
  const isInPlan = (workoutId) => {
    return plan.some(
      (item) => String(item.id) === String(workoutId)
    );
  };

  // Check whether workout is already saved
  const isSaved = (workoutId) => {
    return saved.some(
      (item) => String(item.id) === String(workoutId)
    );
  };

  // Plan metrics
  const planMetrics = useMemo(() => {
    const exercises = plan.length;

    const minutes = plan.reduce(
      (total, workout) =>
        total + Number(workout.duration || workout.durationMinutes || 0),
      0
    );

    const calories = plan.reduce(
      (total, workout) =>
        total + Number(workout.calories || workout.caloriesBurned || 0),
      0
    );

    return {
      exercises,
      minutes,
      calories,
    };
  }, [plan]);

  const value = {
    plan,
    saved,
    hydrated,

    planCount: plan.length,
    savedCount: saved.length,

    planMetrics,

    addToPlan,
    removeFromPlan,
    toggleComplete,

    saveWorkout,
    removeSaved,

    isInPlan,
    isSaved,
  };

  return (
    <FitLogContext.Provider value={value}>
      {children}
    </FitLogContext.Provider>
  );
}

export function useFitLog() {
  const context = useContext(FitLogContext);

  if (!context) {
    throw new Error(
      "useFitLog must be used inside a FitLogProvider"
    );
  }

  return context;
}