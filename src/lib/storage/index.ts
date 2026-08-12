import { generateReadingYear, getDaysInYear } from '../readingPlan/generator';
import type { GeneratedAssignment, GeneratedReadingDay } from '../readingPlan/types';

const LOCAL_STORAGE_PLAN_KEY = 'bible_pwa_active_plan_2026';
const LOCAL_STORAGE_COMPLETION_KEY = 'bible_pwa_completions';
const LOCAL_STORAGE_NOTES_KEY = 'bible_pwa_notes';

// Memory cache for active plan days
let activeDaysCache: GeneratedReadingDay[] | null = null;
let completionsCache: Record<string, { completed: boolean; completedAt?: string }> = {};
let notesCache: Record<string, string> = {};

function initLocalStorageData(): GeneratedReadingDay[] {
  if (typeof window === 'undefined') {
    return generateReadingYear({ calendarYear: 2026, startDate: '2026-01-01' });
  }

  // Load completion states
  try {
    const rawCompletions = localStorage.getItem(LOCAL_STORAGE_COMPLETION_KEY);
    if (rawCompletions) {
      completionsCache = JSON.parse(rawCompletions);
    }
  } catch (e) {
    completionsCache = {};
  }

  // Load notes
  try {
    const rawNotes = localStorage.getItem(LOCAL_STORAGE_NOTES_KEY);
    if (rawNotes) {
      notesCache = JSON.parse(rawNotes);
    }
  } catch (e) {
    notesCache = {};
  }

  // Generate plan for 2026 if not already cached
  if (!activeDaysCache) {
    activeDaysCache = generateReadingYear({ calendarYear: 2026, startDate: '2026-01-01' });

    // Seed initial completion state for realistic demonstration if empty
    if (Object.keys(completionsCache).length === 0) {
      seedDemoCompletions(activeDaysCache);
    }

    // Apply completions to assignments
    applyCompletionsToDays(activeDaysCache);
  }

  return activeDaysCache;
}

function seedDemoCompletions(days: GeneratedReadingDay[]) {
  // Find current date index in 2026 (or August 12, 2026)
  const targetDateStr = '2026-08-12';
  let targetIdx = days.findIndex((d) => d.date === targetDateStr);
  if (targetIdx === -1) targetIdx = 223; // Day 224

  // Mark all days prior to day 220 complete
  for (let i = 0; i < targetIdx; i++) {
    const d = days[i];
    for (const a of d.assignments) {
      const id = `${d.date}_${a.trackSlug}_${a.bookCode}_${a.chapter}`;
      completionsCache[id] = { completed: true, completedAt: `${d.date}T08:00:00Z` };
    }
  }

  // Day 224 (2026-08-12): Mark 6 of 8 completed
  if (days[targetIdx]) {
    const todayAssignments = days[targetIdx].assignments;
    // Luke 8, Luke 9, 1 Chr 12, 1 Chr 13
    todayAssignments.forEach((a, idx) => {
      const id = `${days[targetIdx].date}_${a.trackSlug}_${a.bookCode}_${a.chapter}`;
      if (idx < 5) {
        completionsCache[id] = { completed: true, completedAt: `${days[targetIdx].date}T08:30:00Z` };
      }
    });

    // Add a sample note for Luke 8
    notesCache[`${days[targetIdx].date}_LUK.8`] =
      'Luke 8: Parable of the Sower and Jesus calming the storm. Notice the theme of hearing and responding to God’s word.';
  }

  saveCompletionsToStorage();
  saveNotesToStorage();
}

function applyCompletionsToDays(days: GeneratedReadingDay[]) {
  for (const day of days) {
    for (const assignment of day.assignments) {
      const id = assignment.id || `${day.date}_${assignment.trackSlug}_${assignment.bookCode}_${assignment.chapter}`;
      assignment.id = id;

      const record = completionsCache[id];
      if (record) {
        assignment.completed = record.completed;
        assignment.completedAt = record.completedAt || null;
      } else {
        assignment.completed = false;
        assignment.completedAt = null;
      }
    }
  }
}

function saveCompletionsToStorage() {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(LOCAL_STORAGE_COMPLETION_KEY, JSON.stringify(completionsCache));
  } catch (e) {
    console.error('Failed to save completion to localStorage', e);
  }
}

function saveNotesToStorage() {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(LOCAL_STORAGE_NOTES_KEY, JSON.stringify(notesCache));
  } catch (e) {
    console.error('Failed to save notes to localStorage', e);
  }
}

export async function getActiveReadingYearDays(year: number = 2026): Promise<GeneratedReadingDay[]> {
  const days = initLocalStorageData();
  applyCompletionsToDays(days);
  return days;
}

export async function getDailyReadingByDate(dateStr: string): Promise<GeneratedReadingDay | null> {
  const days = await getActiveReadingYearDays();
  const found = days.find((d) => d.date === dateStr);
  return found || null;
}

export async function toggleAssignmentCompletion(assignmentId: string, completed: boolean): Promise<boolean> {
  completionsCache[assignmentId] = {
    completed,
    completedAt: completed ? new Date().toISOString() : undefined
  };

  saveCompletionsToStorage();

  if (activeDaysCache) {
    applyCompletionsToDays(activeDaysCache);
  }

  return true;
}

export async function saveStudyNote(dateStr: string, refKey: string, content: string): Promise<boolean> {
  const fullKey = `${dateStr}_${refKey}`;
  if (content.trim()) {
    notesCache[fullKey] = content.trim();
  } else {
    delete notesCache[fullKey];
  }
  saveNotesToStorage();
  return true;
}

export async function getStudyNotesForDate(dateStr: string): Promise<Record<string, string>> {
  initLocalStorageData();
  const dateNotes: Record<string, string> = {};
  const prefix = `${dateStr}_`;
  for (const [key, val] of Object.entries(notesCache)) {
    if (key.startsWith(prefix)) {
      const refKey = key.slice(prefix.length);
      dateNotes[refKey] = val;
    }
  }
  return dateNotes;
}

export async function getUnfinishedReadings(): Promise<{ date: string; assignments: GeneratedAssignment[] }[]> {
  const days = await getActiveReadingYearDays();
  const todayStr = '2026-08-12'; // or current date

  const pastUnfinished: { date: string; assignments: GeneratedAssignment[] }[] = [];

  for (const day of days) {
    if (day.date >= todayStr) continue; // Only prior dates

    const unfinished = day.assignments.filter((a) => !a.completed);
    if (unfinished.length > 0) {
      pastUnfinished.push({
        date: day.date,
        assignments: unfinished
      });
    }
  }

  return pastUnfinished;
}
