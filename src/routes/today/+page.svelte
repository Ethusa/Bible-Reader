<script ts>
  import { onMount } from 'svelte';
  import Header from '$lib/components/Header.svelte';
  import DailyProgress from '$lib/components/DailyProgress.svelte';
  import ReadingTrackCard from '$lib/components/ReadingTrackCard.svelte';
  import OpenReadingsModal from '$lib/components/OpenReadingsModal.svelte';
  import NotebookExportModal from '$lib/components/NotebookExportModal.svelte';
  import {
    getActiveReadingYearDays,
    getDailyReadingByDate,
    toggleAssignmentCompletion,
    saveStudyNote,
    getStudyNotesForDate
  } from '$lib/storage';
  import { calculateProgress } from '$lib/readingPlan/progress';
  import type { GeneratedReadingDay } from '$lib/readingPlan/types';
  import { BookOpen, FileText, Sparkles } from 'lucide-svelte';

  const TODAY_DATE_STR = '2026-08-12';
  let selectedDateStr: string = TODAY_DATE_STR;
  let currentDay: GeneratedReadingDay | null = null;
  let allDays: GeneratedReadingDay[] = [];
  let dayNotes: Record<string, string> = {};

  let isOpenReadingsModal: boolean = false;
  let isNotebookModal: boolean = false;

  $: isToday = selectedDateStr === TODAY_DATE_STR;

  onMount(async () => {
    await loadDataForDate(selectedDateStr);
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  async function loadDataForDate(dateStr: string) {
    allDays = await getActiveReadingYearDays();
    currentDay = await getDailyReadingByDate(dateStr);
    dayNotes = await getStudyNotesForDate(dateStr);
  }

  function handlePrevDay() {
    if (!currentDay || !allDays.length) return;
    const idx = allDays.findIndex((d) => d.date === selectedDateStr);
    if (idx > 0) {
      selectedDateStr = allDays[idx - 1].date;
      loadDataForDate(selectedDateStr);
    }
  }

  function handleNextDay() {
    if (!currentDay || !allDays.length) return;
    const idx = allDays.findIndex((d) => d.date === selectedDateStr);
    if (idx !== -1 && idx < allDays.length - 1) {
      selectedDateStr = allDays[idx + 1].date;
      loadDataForDate(selectedDateStr);
    }
  }

  function handleGoToday() {
    selectedDateStr = TODAY_DATE_STR;
    loadDataForDate(selectedDateStr);
  }

  function handleKeyDown(e: KeyboardEvent) {
    const activeEl = document.activeElement;
    if (activeEl && (activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA')) {
      return; // Do not interfere when typing inside form elements
    }

    if (e.key === 'ArrowLeft') {
      handlePrevDay();
    } else if (e.key === 'ArrowRight') {
      handleNextDay();
    } else if (e.key === 't' || e.key === 'T') {
      handleGoToday();
    }
  }

  async function handleToggleComplete(assignmentId: string, completed: boolean) {
    await toggleAssignmentCompletion(assignmentId, completed);
    await loadDataForDate(selectedDateStr);
  }

  async function handleSaveNote(refKey: string, noteText: string) {
    await saveStudyNote(selectedDateStr, refKey, noteText);
    dayNotes = await getStudyNotesForDate(selectedDateStr);
  }

  $: ntAssignments = currentDay?.assignments.filter((a) => a.trackSlug === 'new_testament') || [];
  $: otAssignments = currentDay?.assignments.filter((a) => a.trackSlug === 'old_testament') || [];
  $: psalmsAssignments = currentDay?.assignments.filter((a) => a.trackSlug === 'psalms') || [];
  $: proverbsAssignments = currentDay?.assignments.filter((a) => a.trackSlug === 'proverbs') || [];

  $: completedCount = currentDay?.assignments.filter((a) => a.completed).length || 0;
  $: totalCount = currentDay?.assignments.length || 0;

  $: overallStats = calculateProgress(allDays);
</script>

<div class="space-y-6 animate-in fade-in duration-200">
  <!-- Header with Date and Day Navigation -->
  {#if currentDay}
    <Header
      {selectedDateStr}
      dayNumber={currentDay.dayNumber}
      totalDays={allDays.length}
      onPrevDay={handlePrevDay}
      onNextDay={handleNextDay}
      onGoToday={handleGoToday}
      {isToday}
    />

    <!-- Overall Daily Completion Progress Bar -->
    <DailyProgress {completedCount} {totalCount} />

    <!-- Action Bar -->
    <div class="flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark shadow-sm">
      <div class="flex items-center space-x-2">
        <Sparkles class="w-4 h-4 text-track-ot shrink-0" />
        <span class="text-xs font-serif italic text-txt-secondaryLight dark:text-txt-secondaryDark">
          "Your word is a lamp to my feet and a light to my path." — Psalm 119:105
        </span>
      </div>

      <div class="flex items-center space-x-2 w-full sm:w-auto justify-end">
        <button
          type="button"
          on:click={() => (isOpenReadingsModal = true)}
          class="flex-1 sm:flex-initial px-3.5 py-2 text-xs font-medium rounded-lg border border-border-light dark:border-border-dark bg-canvas-light dark:bg-canvas-dark text-txt-primaryLight dark:text-txt-primaryDark hover:bg-mutedSurface-light dark:hover:bg-mutedSurface-dark transition-all flex items-center justify-center space-x-1.5"
        >
          <BookOpen class="w-3.5 h-3.5 text-track-nt" />
          <span>Open Today's Readings</span>
        </button>

        <button
          type="button"
          on:click={() => (isNotebookModal = true)}
          class="flex-1 sm:flex-initial px-3.5 py-2 text-xs font-medium rounded-lg bg-track-nt text-white hover:bg-opacity-90 transition-all flex items-center justify-center space-x-1.5 shadow-sm"
        >
          <FileText class="w-3.5 h-3.5" />
          <span>Prepare Study Brief</span>
        </button>
      </div>
    </div>

    <!-- Four Track Cards Container -->
    <div class="grid grid-cols-1 gap-6">
      <!-- 1. New Testament -->
      <ReadingTrackCard
        title="New Testament"
        trackSlug="new_testament"
        rotationNumber={ntAssignments[0]?.rotationNumber || 3}
        maxRotations={4}
        accentColor="#536B92"
        assignments={ntAssignments}
        notes={dayNotes}
        rotationProgressPercent={overallStats.trackStats.new_testament.percentComplete}
        onToggleComplete={handleToggleComplete}
        onSaveNote={handleSaveNote}
      />

      <!-- 2. Old Testament -->
      <ReadingTrackCard
        title="Old Testament (excl. Psalms & Proverbs)"
        trackSlug="old_testament"
        rotationNumber={otAssignments[0]?.rotationNumber || 1}
        maxRotations={1}
        accentColor="#A57846"
        assignments={otAssignments}
        notes={dayNotes}
        rotationProgressPercent={overallStats.trackStats.old_testament.percentComplete}
        onToggleComplete={handleToggleComplete}
        onSaveNote={handleSaveNote}
      />

      <!-- 3. Psalms -->
      <ReadingTrackCard
        title="Psalms"
        trackSlug="psalms"
        rotationNumber={psalmsAssignments[0]?.rotationNumber || 2}
        maxRotations={2}
        accentColor="#67806D"
        assignments={psalmsAssignments}
        notes={dayNotes}
        rotationProgressPercent={overallStats.trackStats.psalms.percentComplete}
        onToggleComplete={handleToggleComplete}
        onSaveNote={handleSaveNote}
      />

      <!-- 4. Proverbs -->
      <ReadingTrackCard
        title="Proverbs"
        trackSlug="proverbs"
        rotationNumber={proverbsAssignments[0]?.rotationNumber || 3}
        maxRotations={4}
        accentColor="#A56359"
        assignments={proverbsAssignments}
        notes={dayNotes}
        rotationProgressPercent={overallStats.trackStats.proverbs.percentComplete}
        onToggleComplete={handleToggleComplete}
        onSaveNote={handleSaveNote}
      />
    </div>

    <!-- Modals -->
    <OpenReadingsModal
      isOpen={isOpenReadingsModal}
      assignments={currentDay.assignments}
      onClose={() => (isOpenReadingsModal = false)}
    />

    <NotebookExportModal
      isOpen={isNotebookModal}
      day={currentDay}
      notes={dayNotes}
      onClose={() => (isNotebookModal = false)}
    />
  {:else}
    <div class="p-12 text-center">
      <p class="text-xs text-txt-secondaryLight dark:text-txt-secondaryDark">
        Loading today's reading schedule...
      </p>
    </div>
  {/if}
</div>
