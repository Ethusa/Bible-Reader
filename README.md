# Four-Track Bible Reading PWA

A polished, production-ready **Bible Reading Progressive Web App (PWA)** designed around a high-frequency, four-track Scripture reading system. Built with **SvelteKit, TypeScript, Tailwind CSS, and Supabase PostgreSQL**.

---

## Product Vision & Core Purpose

This application provides a serious reader with a continuous, daily Scripture reading system that coordinates four concurrent reading tracks throughout the year:

1. **New Testament — 4 complete rotations per year** (1,040 chapter assignments)
2. **Old Testament excluding Psalms & Proverbs — 1 complete rotation per year** (748 chapter assignments)
3. **Psalms — 2 complete rotations per year** (300 chapter assignments)
4. **Proverbs — 4 complete rotations per year** (124 chapter assignments)

The experience removes all daily planning friction. Everyday readings are deterministically pre-calculated, persisted, and presented with visible progress, fast YouVersion ESV audio links, and an exegesis study bridge for Google NotebookLM.

---

## Reading Plan Mathematics & Allocation Algorithm

### Annual Chapter Breakdown
- **New Testament**: 260 chapters × 4 rotations = **1,040 total assignments per year** (~2.85 chapters/day → 3 or 2 chapters daily).
- **Old Testament**: 929 total chapters - 181 (Psalms 150 + Proverbs 31) = **748 chapters × 1 rotation = 748 total assignments per year** (~2.05 chapters/day → 2 or 3 chapters daily).
- **Psalms**: 150 chapters × 2 rotations = **300 total assignments per year** (~0.82 chapters/day → 1 Psalm most days).
- **Proverbs**: 31 chapters × 4 rotations = **124 total assignments per year** (~0.34 chapters/day → 1 chapter every ~3 days).

### Why Daily Chapter Counts Vary
Rather than rounding daily averages independently (which causes accumulated rounding errors or missing/extra chapters), the system uses a **cumulative target accumulator algorithm** (Bresenham-style integer distribution):

```ts
targetByToday = Math.round(((dayIndex + 1) * totalAssignments) / daysInYear);
targetByYesterday = Math.round((dayIndex * totalAssignments) / daysInYear);
assignmentsToday = targetByToday - targetByYesterday;
```

This guarantees:
- **Mathematically exact annual totals** (1,040 NT, 748 OT, 300 Psalms, 124 Proverbs).
- **Evenly distributed daily readings**.
- **Continuous canonical ordering** with zero missing chapters and seamless rotation restarts.
- **Support for 365-day standard years and 366-day leap years**.

---

## YouVersion ESV Integration

- **Web Passage URL**: `https://www.bible.com/bible/59/{BOOK}.{CHAPTER}.ESV`
- **Native Mobile Scheme**: `youversion://bible?reference={BOOK}.{CHAPTER}&version=59`
- **Mobile Fallback Launcher**: Executes native scheme on mobile/tablet devices; if the YouVersion app is not installed, degrades gracefully to the HTTPS passage URL.

---

## NotebookLM Study Bridge

The Today dashboard includes a **"Prepare Study Brief"** action that compiles today's assigned readings and user observations into a structured Markdown document. It includes dispassionate biblical scholar exegesis guidelines (distinguishing textual observation, historical context, literary structure, and canonical connections) and 7 analytical study questions.

Actions provided:
- **Copy Study Brief**
- **Download Markdown (`.md`)**
- **Copy Study Prompt Only**
- **Open NotebookLM**

---

## Supabase Schema & Database Architecture

Database tables defined in `supabase/migrations/20260812000000_init_schema.sql`:
- `profiles` — User profile, display name, timezone, active plan ID
- `reading_plans` & `reading_plan_tracks` — Plan definitions & track configuration
- `reading_years` — User active reading plan instance
- `daily_readings` — Daily reading calendar records (unique per reading year + date)
- `reading_assignments` — Individual chapter assignment rows
- `reading_completion` — Completion status records per user & assignment
- `study_notes` — Day-level and passage-level study notes

Row-Level Security (RLS) policies enforce strict per-user data isolation.

### Zero-Config Local Mode
If Supabase environment credentials are not present, the app automatically runs in **Local IndexedDB / LocalStorage mode**, saving all completions and notes locally without extra setup!

---

## Local Development & Testing

```bash
# 1. Install dependencies
pnpm install

# 2. Run Vitest unit tests (verifies 1,040 NT, 748 OT, 300 Psalms, 124 Proverbs chapter totals & leap year math)
pnpm test

# 3. Launch SvelteKit dev server
pnpm dev
```

---

## Key App Features & Navigation

- `/today` — Main dashboard with 4 track cards, completion checkboxes, YouVersion links, and rotation progress.
- `/calendar` — Month calendar view with completion status rings and year progress summary.
- `/progress` — Track completion metrics and rotation analytics.
- `/catch-up` — Unfinished past readings grouped by date.
- `/study/[date]` — Workspace for study notes and NotebookLM brief export.
- `/onboarding` — Setup flow for reading year and start date preferences.
- `/settings` — Translation settings, theme toggling, data mode, and schedule management.
