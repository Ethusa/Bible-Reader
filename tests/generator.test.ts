import { describe, it, expect } from 'vitest';
import { generateReadingYear, getDaysInYear, isLeapYear } from '../src/lib/readingPlan/generator';
import { BIBLE_BOOKS } from '../src/lib/bible/books';

describe('Reading Plan Generator Mathematics', () => {
  it('identifies leap years correctly', () => {
    expect(isLeapYear(2024)).toBe(true);
    expect(isLeapYear(2025)).toBe(false);
    expect(isLeapYear(2026)).toBe(false);
    expect(isLeapYear(2000)).toBe(true);
    expect(isLeapYear(1900)).toBe(false);

    expect(getDaysInYear(2026)).toBe(365);
    expect(getDaysInYear(2024)).toBe(366);
  });

  it('generates exact chapter counts for a standard 365-day year (2026)', () => {
    const days = generateReadingYear({ calendarYear: 2026, startDate: '2026-01-01' });

    expect(days.length).toBe(365);

    let totalNT = 0;
    let totalOT = 0;
    let totalPsalms = 0;
    let totalProverbs = 0;

    const ntCounts: Record<string, number> = {};
    const otCounts: Record<string, number> = {};
    const psalmCounts: Record<number, number> = {};
    const proverbsCounts: Record<number, number> = {};

    for (const day of days) {
      for (const assignment of day.assignments) {
        if (assignment.trackSlug === 'new_testament') {
          totalNT++;
          const ref = `${assignment.bookCode}.${assignment.chapter}`;
          ntCounts[ref] = (ntCounts[ref] || 0) + 1;
        } else if (assignment.trackSlug === 'old_testament') {
          totalOT++;
          const ref = `${assignment.bookCode}.${assignment.chapter}`;
          otCounts[ref] = (otCounts[ref] || 0) + 1;
          // Verify Psalms and Proverbs never appear in OT track
          expect(assignment.bookCode).not.toBe('PSA');
          expect(assignment.bookCode).not.toBe('PRO');
        } else if (assignment.trackSlug === 'psalms') {
          totalPsalms++;
          psalmCounts[assignment.chapter] = (psalmCounts[assignment.chapter] || 0) + 1;
        } else if (assignment.trackSlug === 'proverbs') {
          totalProverbs++;
          proverbsCounts[assignment.chapter] = (proverbsCounts[assignment.chapter] || 0) + 1;
        }
      }
    }

    // 1. NT: 260 chapters * 4 rotations = 1040 assignments
    expect(totalNT).toBe(1040);
    expect(Object.keys(ntCounts).length).toBe(260);
    for (const count of Object.values(ntCounts)) {
      expect(count).toBe(4);
    }

    // 2. OT: 748 chapters * 1 rotation = 748 assignments
    expect(totalOT).toBe(748);
    expect(Object.keys(otCounts).length).toBe(748);
    for (const count of Object.values(otCounts)) {
      expect(count).toBe(1);
    }

    // 3. Psalms: 150 chapters * 2 rotations = 300 assignments
    expect(totalPsalms).toBe(300);
    expect(Object.keys(psalmCounts).length).toBe(150);
    for (const count of Object.values(psalmCounts)) {
      expect(count).toBe(2);
    }

    // 4. Proverbs: 31 chapters * 4 rotations = 124 assignments
    expect(totalProverbs).toBe(124);
    expect(Object.keys(proverbsCounts).length).toBe(31);
    for (const count of Object.values(proverbsCounts)) {
      expect(count).toBe(4);
    }
  });

  it('supports 366-day leap year (2024)', () => {
    const days = generateReadingYear({ calendarYear: 2024, startDate: '2024-01-01' });

    expect(days.length).toBe(366);

    let totalNT = 0;
    let totalOT = 0;
    let totalPsalms = 0;
    let totalProverbs = 0;

    for (const day of days) {
      for (const assignment of day.assignments) {
        if (assignment.trackSlug === 'new_testament') totalNT++;
        else if (assignment.trackSlug === 'old_testament') totalOT++;
        else if (assignment.trackSlug === 'psalms') totalPsalms++;
        else if (assignment.trackSlug === 'proverbs') totalProverbs++;
      }
    }

    expect(totalNT).toBe(1040);
    expect(totalOT).toBe(748);
    expect(totalPsalms).toBe(300);
    expect(totalProverbs).toBe(124);
  });

  it('returns identical output for identical inputs (deterministic)', () => {
    const planA = generateReadingYear({ calendarYear: 2026, startDate: '2026-01-01' });
    const planB = generateReadingYear({ calendarYear: 2026, startDate: '2026-01-01' });

    expect(JSON.stringify(planA)).toBe(JSON.stringify(planB));
  });
});
