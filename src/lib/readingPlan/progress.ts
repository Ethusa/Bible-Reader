import type { GeneratedAssignment, GeneratedReadingDay, TrackSlug } from './types';
import { getBookByYouVersionCode } from '../bible/books';

export interface TrackProgressStats {
  trackSlug: TrackSlug;
  totalAssignments: number;
  completedAssignments: number;
  percentComplete: number;
  currentRotation: number;
  maxRotations: number;
  lastCompletedReference?: string;
  currentReference?: string;
}

export interface OverallProgressStats {
  totalAssignments: number;
  completedAssignments: number;
  overallPercent: number;
  completedDaysCount: number;
  totalDaysCount: number;
  trackStats: Record<TrackSlug, TrackProgressStats>;
}

export function calculateProgress(days: GeneratedReadingDay[]): OverallProgressStats {
  let totalAssignments = 0;
  let completedAssignments = 0;
  let completedDaysCount = 0;

  const trackTotals: Record<TrackSlug, { total: number; completed: number; lastRef?: string; currentRef?: string; rotation: number; maxRot: number }> = {
    new_testament: { total: 0, completed: 0, rotation: 1, maxRot: 4 },
    old_testament: { total: 0, completed: 0, rotation: 1, maxRot: 1 },
    psalms: { total: 0, completed: 0, rotation: 1, maxRot: 2 },
    proverbs: { total: 0, completed: 0, rotation: 1, maxRot: 4 }
  };

  for (const day of days) {
    let dayAllCompleted = day.assignments.length > 0;

    for (const assignment of day.assignments) {
      totalAssignments++;
      const tStats = trackTotals[assignment.trackSlug];
      tStats.total++;

      const book = getBookByYouVersionCode(assignment.bookCode);
      const refStr = `${book ? book.name : assignment.bookCode} ${assignment.chapter}`;

      if (assignment.completed) {
        completedAssignments++;
        tStats.completed++;
        tStats.lastRef = refStr;
        tStats.rotation = assignment.rotationNumber;
      } else {
        dayAllCompleted = false;
        if (!tStats.currentRef) {
          tStats.currentRef = refStr;
          tStats.rotation = assignment.rotationNumber;
        }
      }
    }

    if (dayAllCompleted && day.assignments.length > 0) {
      completedDaysCount++;
    }
  }

  const trackStats: Record<TrackSlug, TrackProgressStats> = {
    new_testament: {
      trackSlug: 'new_testament',
      totalAssignments: trackTotals.new_testament.total,
      completedAssignments: trackTotals.new_testament.completed,
      percentComplete: trackTotals.new_testament.total > 0 ? Math.round((trackTotals.new_testament.completed / trackTotals.new_testament.total) * 100) : 0,
      currentRotation: trackTotals.new_testament.rotation,
      maxRotations: 4,
      lastCompletedReference: trackTotals.new_testament.lastRef,
      currentReference: trackTotals.new_testament.currentRef
    },
    old_testament: {
      trackSlug: 'old_testament',
      totalAssignments: trackTotals.old_testament.total,
      completedAssignments: trackTotals.old_testament.completed,
      percentComplete: trackTotals.old_testament.total > 0 ? Math.round((trackTotals.old_testament.completed / trackTotals.old_testament.total) * 100) : 0,
      currentRotation: trackTotals.old_testament.rotation,
      maxRotations: 1,
      lastCompletedReference: trackTotals.old_testament.lastRef,
      currentReference: trackTotals.old_testament.currentRef
    },
    psalms: {
      trackSlug: 'psalms',
      totalAssignments: trackTotals.psalms.total,
      completedAssignments: trackTotals.psalms.completed,
      percentComplete: trackTotals.psalms.total > 0 ? Math.round((trackTotals.psalms.completed / trackTotals.psalms.total) * 100) : 0,
      currentRotation: trackTotals.psalms.rotation,
      maxRotations: 2,
      lastCompletedReference: trackTotals.psalms.lastRef,
      currentReference: trackTotals.psalms.currentRef
    },
    proverbs: {
      trackSlug: 'proverbs',
      totalAssignments: trackTotals.proverbs.total,
      completedAssignments: trackTotals.proverbs.completed,
      percentComplete: trackTotals.proverbs.total > 0 ? Math.round((trackTotals.proverbs.completed / trackTotals.proverbs.total) * 100) : 0,
      currentRotation: trackTotals.proverbs.rotation,
      maxRotations: 4,
      lastCompletedReference: trackTotals.proverbs.lastRef,
      currentReference: trackTotals.proverbs.currentRef
    }
  };

  return {
    totalAssignments,
    completedAssignments,
    overallPercent: totalAssignments > 0 ? Math.round((completedAssignments / totalAssignments) * 100) : 0,
    completedDaysCount,
    totalDaysCount: days.length,
    trackStats
  };
}
