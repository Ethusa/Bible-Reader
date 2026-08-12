<script ts>
  import { onMount } from 'svelte';
  import { getActiveReadingYearDays } from '$lib/storage';
  import type { GeneratedReadingDay } from '$lib/readingPlan/types';
  import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-svelte';
  import { goto } from '$app/navigation';

  let allDays: GeneratedReadingDay[] = [];
  let currentMonthIndex: number = 7; // August (0-indexed: 7)
  let currentYear: number = 2026;

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  onMount(async () => {
    allDays = await getActiveReadingYearDays();
  });

  $: daysInMonthGrid = getCalendarGrid(currentYear, currentMonthIndex, allDays);

  function getCalendarGrid(year: number, monthIdx: number, daysList: GeneratedReadingDay[]) {
    const firstDayOfMonth = new Date(year, monthIdx, 1);
    const startDayOfWeek = firstDayOfMonth.getDay(); // 0 = Sun
    const lastDayOfMonth = new Date(year, monthIdx + 1, 0).getDate();

    const grid: ({ dayNumber: number; dateStr: string; status: 'complete' | 'partial' | 'incomplete' | 'future' } | null)[] = [];

    // Empty lead cells
    for (let i = 0; i < startDayOfWeek; i++) {
      grid.push(null);
    }

    const todayStr = '2026-08-12';

    for (let d = 1; d <= lastDayOfMonth; d++) {
      const monthStr = String(monthIdx + 1).padStart(2, '0');
      const dateStr = String(d).padStart(2, '0');
      const formattedDate = `${year}-${monthStr}-${dateStr}`;

      const matchedDay = daysList.find((day) => day.date === formattedDate);

      let status: 'complete' | 'partial' | 'incomplete' | 'future' = 'incomplete';
      if (formattedDate > todayStr) {
        status = 'future';
      } else if (matchedDay) {
        const completedCount = matchedDay.assignments.filter((a) => a.completed).length;
        const totalCount = matchedDay.assignments.length;

        if (totalCount > 0 && completedCount === totalCount) {
          status = 'complete';
        } else if (completedCount > 0) {
          status = 'partial';
        } else {
          status = 'incomplete';
        }
      }

      grid.push({
        dayNumber: d,
        dateStr: formattedDate,
        status
      });
    }

    return grid;
  }

  function prevMonth() {
    if (currentMonthIndex > 0) {
      currentMonthIndex--;
    }
  }

  function nextMonth() {
    if (currentMonthIndex < 11) {
      currentMonthIndex++;
    }
  }

  function handleSelectDate(dateStr: string) {
    goto(`/today`);
  }
</script>

<div class="space-y-6 animate-in fade-in duration-200">
  <div class="border-b border-border-light dark:border-border-dark pb-4">
    <h1 class="text-2xl font-serif font-bold text-txt-primaryLight dark:text-txt-primaryDark">
      Reading Calendar
    </h1>
    <p class="text-xs text-txt-secondaryLight dark:text-txt-secondaryDark mt-1">
      Visual completion overview across the 365-day reading year.
    </p>
  </div>

  <!-- Month Navigation Header -->
  <div class="flex items-center justify-between p-4 rounded-xl bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark shadow-sm">
    <button
      on:click={prevMonth}
      disabled={currentMonthIndex === 0}
      class="p-2 rounded-lg text-txt-secondaryLight dark:text-txt-secondaryDark hover:bg-mutedSurface-light dark:hover:bg-mutedSurface-dark disabled:opacity-30"
    >
      <ChevronLeft class="w-5 h-5" />
    </button>

    <div class="text-center">
      <h2 class="text-lg font-serif font-bold text-txt-primaryLight dark:text-txt-primaryDark">
        {monthNames[currentMonthIndex]} {currentYear}
      </h2>
    </div>

    <button
      on:click={nextMonth}
      disabled={currentMonthIndex === 11}
      class="p-2 rounded-lg text-txt-secondaryLight dark:text-txt-secondaryDark hover:bg-mutedSurface-light dark:hover:bg-mutedSurface-dark disabled:opacity-30"
    >
      <ChevronRight class="w-5 h-5" />
    </button>
  </div>

  <!-- Calendar Grid Surface -->
  <div class="p-4 rounded-2xl bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark shadow-sm">
    <!-- Day Headers -->
    <div class="grid grid-cols-7 text-center font-sans text-xs font-semibold text-txt-secondaryLight dark:text-txt-secondaryDark mb-2 pb-2 border-b border-border-light/50 dark:border-border-dark/50">
      <span>Sun</span>
      <span>Mon</span>
      <span>Tue</span>
      <span>Wed</span>
      <span>Thu</span>
      <span>Fri</span>
      <span>Sat</span>
    </div>

    <!-- Grid Cells -->
    <div class="grid grid-cols-7 gap-1.5 sm:gap-2">
      {#each daysInMonthGrid as cell}
        {#if cell}
          <button
            on:click={() => handleSelectDate(cell.dateStr)}
            class="aspect-square rounded-xl p-1.5 flex flex-col items-center justify-between border transition-all duration-150 relative hover:border-track-nt {cell.dateStr === '2026-08-12'
              ? 'ring-2 ring-track-nt font-bold bg-track-nt/5'
              : 'border-border-light/40 dark:border-border-dark/40 bg-canvas-light/40 dark:bg-canvas-dark/40'}"
          >
            <span class="text-xs font-sans">{cell.dayNumber}</span>

            <!-- Status Indicator Ring / Dot -->
            {#if cell.status === 'complete'}
              <div class="w-2.5 h-2.5 rounded-full bg-track-success"></div>
            {:else if cell.status === 'partial'}
              <div class="w-2.5 h-2.5 rounded-full border-2 border-track-ot bg-track-ot/30"></div>
            {:else if cell.status === 'incomplete'}
              <div class="w-2 h-2 rounded-full bg-txt-secondaryLight/30 dark:bg-txt-secondaryDark/30"></div>
            {:else}
              <div class="w-1.5 h-1.5 rounded-full bg-transparent"></div>
            {/if}
          </button>
        {:else}
          <div class="aspect-square"></div>
        {/if}
      {/each}
    </div>
  </div>

  <!-- Legend -->
  <div class="flex flex-wrap items-center justify-center gap-4 text-xs text-txt-secondaryLight dark:text-txt-secondaryDark pt-2">
    <div class="flex items-center space-x-1.5">
      <div class="w-2.5 h-2.5 rounded-full bg-track-success"></div>
      <span>Complete</span>
    </div>
    <div class="flex items-center space-x-1.5">
      <div class="w-2.5 h-2.5 rounded-full border-2 border-track-ot bg-track-ot/30"></div>
      <span>Partial</span>
    </div>
    <div class="flex items-center space-x-1.5">
      <div class="w-2 h-2 rounded-full bg-txt-secondaryLight/30 dark:bg-txt-secondaryDark/30"></div>
      <span>Incomplete</span>
    </div>
  </div>
</div>
