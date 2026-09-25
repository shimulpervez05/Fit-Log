# FitLog — Workout Library

FitLog is a responsive dark-themed workout library and daily workout planner built with Next.js. Users can browse workouts, view detailed exercise information, add exercises to today's plan, save workouts for later, and track completed exercises.

## Live Project

Add your deployed URL here:

https://your-fitlog-url.vercel.app

## Features

- Browse all available workouts from the FitLog API
- Responsive workout library for mobile, tablet, and desktop
- View detailed workout information
- Add up to five workouts to Today's Plan
- Save workouts for later
- Mark planned workouts as completed
- Remove workouts from Today's Plan or Saved
- Live Exercises, Minutes, and Calories metrics
- Sort workouts by Duration, Calories, or Rating
- Toast notifications for important actions
- Loading states while data is being fetched
- Custom 404 page for unknown routes
- LocalStorage persistence for Today's Plan and Saved workouts
- Responsive mobile navigation
- Dark gym-focused UI with neon accent styling

## Technologies

- Next.js
- React
- App Router
- Tailwind CSS
- Lucide React
- Context API
- JavaScript
- LocalStorage
- REST API

## API

All workout data is loaded from:

https://api.abcz.workers.dev/api/fitlog

Single workout:

https://api.abcz.workers.dev/api/fitlog/:id

## Main Routes

| Route | Description |
| --- | --- |
| `/` | Workout library and home page |
| `/workout/:id` | Workout details page |
| `/my-plan` | Today's Plan and Saved workouts |

## Project Structure

```text
fitlog/
├── app/
│   ├── workout/
│   │   └── [id]/
│   │       └── page.jsx
│   │
│   ├── my-plan/
│   │   └── page.jsx
│   │
│   ├── globals.css
│   ├── layout.jsx
│   ├── loading.jsx
│   ├── not-found.jsx
│   └── page.jsx
│
├── components/
│   ├── Navbar.jsx
│   ├── Hero.jsx
│   ├── WorkoutLibrary.jsx
│   ├── WorkoutCard.jsx
│   ├── WorkoutDetails.jsx
│   ├── PlanCard.jsx
│   ├── Metrics.jsx
│   ├── SortDropdown.jsx
│   ├── EmptyState.jsx
│   ├── Toast.jsx
│   └── Footer.jsx
│
├── context/
│   └── FitLogContext.jsx
│
├── lib/
│   └── api.js
│
├── public/
│   └── images/
│
├── README.md
├── package.json
├── postcss.config.mjs
└── jsconfig.json