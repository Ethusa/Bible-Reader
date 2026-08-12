export type TrackSlug = 'new_testament' | 'old_testament' | 'psalms' | 'proverbs';

export interface ReadingPlanTrackConfig {
  slug: TrackSlug;
  name: string;
  displayOrder: number;
  rotationTarget: number;
  accentColor: string;
}

export interface ChapterUnit {
  bookId: string;
  bookCode: string;
  chapter: number;
  rotationNumber: number;
  positionInTrack: number;
}

export interface GeneratedAssignment extends ChapterUnit {
  id?: string;
  trackSlug: TrackSlug;
  displayOrder: number;
  completed?: boolean;
  completedAt?: string | null;
}

export interface GeneratedReadingDay {
  date: string; // ISO date format YYYY-MM-DD
  dayNumber: number; // 1 to 365 or 366
  assignments: GeneratedAssignment[];
}

export interface ReadingYearConfig {
  id?: string;
  calendarYear: number;
  startDate: string; // YYYY-MM-DD
  daysInYear: number;
}

export const SYSTEM_TRACKS: ReadingPlanTrackConfig[] = [
  {
    slug: 'new_testament',
    name: 'New Testament',
    displayOrder: 1,
    rotationTarget: 4,
    accentColor: '#536B92'
  },
  {
    slug: 'old_testament',
    name: 'Old Testament',
    displayOrder: 2,
    rotationTarget: 1,
    accentColor: '#A57846'
  },
  {
    slug: 'psalms',
    name: 'Psalms',
    displayOrder: 3,
    rotationTarget: 2,
    accentColor: '#67806D'
  },
  {
    slug: 'proverbs',
    name: 'Proverbs',
    displayOrder: 4,
    rotationTarget: 4,
    accentColor: '#A56359'
  }
];
