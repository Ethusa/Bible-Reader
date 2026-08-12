import type { GeneratedAssignment, GeneratedReadingDay, TrackSlug } from './types';
import { getTrackMasterSequence } from './sequences';

export function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

export function getDaysInYear(year: number): number {
  return isLeapYear(year) ? 366 : 365;
}

export interface GeneratePlanOptions {
  calendarYear: number;
  startDate?: string; // YYYY-MM-DD, defaults to `${calendarYear}-01-01`
}

export function generateReadingYear(options: GeneratePlanOptions): GeneratedReadingDay[] {
  const { calendarYear } = options;
  const daysInYear = getDaysInYear(calendarYear);
  const startDateStr = options.startDate || `${calendarYear}-01-01`;

  // Parse start date safely as local date
  const [startYear, startMonth, startDay] = startDateStr.split('-').map(Number);
  const startDate = new Date(startYear, startMonth - 1, startDay);

  // Master sequences
  const ntMaster = getTrackMasterSequence('new_testament'); // 1040 chapters
  const otMaster = getTrackMasterSequence('old_testament'); // 748 chapters
  const psalmsMaster = getTrackMasterSequence('psalms'); // 300 chapters
  const proverbsMaster = getTrackMasterSequence('proverbs'); // 124 chapters

  // Pointer indices for each track
  let ntPtr = 0;
  let otPtr = 0;
  let psalmsPtr = 0;
  let proverbsPtr = 0;

  const resultDays: GeneratedReadingDay[] = [];

  for (let dayIdx = 0; dayIdx < daysInYear; dayIdx++) {
    // Current Date
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + dayIdx);

    const yearStr = currentDate.getFullYear();
    const monthStr = String(currentDate.getMonth() + 1).padStart(2, '0');
    const dateStr = String(currentDate.getDate()).padStart(2, '0');
    const formattedDate = `${yearStr}-${monthStr}-${dateStr}`;

    // Compute number of chapters for each track on this day
    const ntCount = getCountForDay(dayIdx, ntMaster.length, daysInYear);
    const otCount = getCountForDay(dayIdx, otMaster.length, daysInYear);
    const psalmsCount = getCountForDay(dayIdx, psalmsMaster.length, daysInYear);
    const proverbsCount = getCountForDay(dayIdx, proverbsMaster.length, daysInYear);

    const dayAssignments: GeneratedAssignment[] = [];
    let displayOrder = 1;

    // NT assignments
    for (let i = 0; i < ntCount && ntPtr < ntMaster.length; i++) {
      const unit = ntMaster[ntPtr++];
      dayAssignments.push({
        ...unit,
        trackSlug: 'new_testament',
        displayOrder: displayOrder++
      });
    }

    // OT assignments
    for (let i = 0; i < otCount && otPtr < otMaster.length; i++) {
      const unit = otMaster[otPtr++];
      dayAssignments.push({
        ...unit,
        trackSlug: 'old_testament',
        displayOrder: displayOrder++
      });
    }

    // Psalms assignments
    for (let i = 0; i < psalmsCount && psalmsPtr < psalmsMaster.length; i++) {
      const unit = psalmsMaster[psalmsPtr++];
      dayAssignments.push({
        ...unit,
        trackSlug: 'psalms',
        displayOrder: displayOrder++
      });
    }

    // Proverbs assignments
    for (let i = 0; i < proverbsCount && proverbsPtr < proverbsMaster.length; i++) {
      const unit = proverbsMaster[proverbsPtr++];
      dayAssignments.push({
        ...unit,
        trackSlug: 'proverbs',
        displayOrder: displayOrder++
      });
    }

    resultDays.push({
      date: formattedDate,
      dayNumber: dayIdx + 1,
      assignments: dayAssignments
    });
  }

  return resultDays;
}

function getCountForDay(dayIndex: number, totalAssignments: number, daysInYear: number): number {
  const targetByToday = Math.round(((dayIndex + 1) * totalAssignments) / daysInYear);
  const targetByYesterday = Math.round((dayIndex * totalAssignments) / daysInYear);
  return targetByToday - targetByYesterday;
}
