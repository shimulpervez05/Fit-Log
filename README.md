# 💪 FitLog

FitLog is a responsive workout library and daily workout planner built for the B14-A6-Fit Log assignment. Users can browse workouts from the provided API, inspect workout details, add lifts to today's plan, save workouts for later, and track their daily metrics.

## Technologies

- Next.js 15
- React 19
- Next.js App Router
- Tailwind CSS 4
- Lucide React
- Context API
- LocalStorage
- REST API

## Key Features

1. Responsive mobile, tablet, and desktop UI.
2. Workout library populated from the FitLog API.
3. Workout detail pages with specs and instructions.
4. Today's Plan with a maximum of five workouts.
5. Saved workouts with live navbar counters.
6. Add, save, mark as done, and remove workout actions with toast feedback.
7. Sort workouts by Duration, Calories, or Rating.
8. LocalStorage persistence for plan and saved workouts.
9. Loading state and custom 404 page.
10. Responsive navigation and footer.

## API

All workouts:
`https://api.abcz.workers.dev/api/fitlog`

Single workout:
`https://api.abcz.workers.dev/api/fitlog/:id`

## Run Locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Production Build

```bash
npm run build
npm start
```

## Git Commit Requirement

For the assignment, keep at least 8 meaningful commits, for example:

- `create Next.js project structure`
- `build responsive navbar`
- `add hero and workout library`
- `add workout details page`
- `add plan and saved context`
- `build my plan page`
- `add sorting and toast actions`
- `finish responsive styling and README`
