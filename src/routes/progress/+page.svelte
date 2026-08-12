<script ts>
  import { onMount } from 'svelte';
  import { getActiveReadingYearDays } from '$lib/storage';
  import { calculateProgress } from '$lib/readingPlan/progress';
  import type { OverallProgressStats } from '$lib/readingPlan/progress';
  import { CheckSquare, BookOpen, Layers } from 'lucide-svelte';

  let stats: OverallProgressStats | null = null;

  onMount(async () => {
    const days = await getActiveReadingYearDays();
    stats = calculateProgress(days);
  });
</script>

<div class="space-y-6 animate-in fade-in duration-200">
  <div class="border-b border-border-light dark:border-border-dark pb-4">
    <h1 class="text-2xl font-serif font-bold text-txt-primaryLight dark:text-txt-primaryDark">
      Reading Plan Progress
    </h1>
    <p class="text-xs text-txt-secondaryLight dark:text-txt-secondaryDark mt-1">
      Annual progress metrics across all four Scripture tracks.
    </p>
  </div>

  {#if stats}
    <!-- Overall Summary Box -->
    <div class="p-6 rounded-2xl bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark shadow-sm">
      <div class="flex items-center justify-between mb-3">
        <div class="flex items-center space-x-2">
          <BookOpen class="w-5 h-5 text-track-nt" />
          <h2 class="text-lg font-serif font-bold text-txt-primaryLight dark:text-txt-primaryDark">
            2026 Bible Reading Year
          </h2>
        </div>
        <span class="text-2xl font-serif font-bold text-track-nt">
          {stats.overallPercent}%
        </span>
      </div>

      <!-- Thin overall bar -->
      <div class="w-full h-3 rounded-full bg-mutedSurface-light dark:bg-mutedSurface-dark overflow-hidden mb-4">
        <div
          class="h-full rounded-full bg-track-nt transition-all duration-300"
          style="width: {stats.overallPercent}%"
        ></div>
      </div>

      <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center pt-2 border-t border-border-light/60 dark:border-border-dark/60">
        <div>
          <span class="text-xs text-txt-secondaryLight dark:text-txt-secondaryDark block">Completed</span>
          <span class="text-lg font-mono font-bold text-txt-primaryLight dark:text-txt-primaryDark">
            {stats.completedAssignments}
          </span>
        </div>

        <div>
          <span class="text-xs text-txt-secondaryLight dark:text-txt-secondaryDark block">Remaining</span>
          <span class="text-lg font-mono font-bold text-txt-primaryLight dark:text-txt-primaryDark">
            {stats.totalAssignments - stats.completedAssignments}
          </span>
        </div>

        <div>
          <span class="text-xs text-txt-secondaryLight dark:text-txt-secondaryDark block">Days Completed</span>
          <span class="text-lg font-mono font-bold text-txt-primaryLight dark:text-txt-primaryDark">
            {stats.completedDaysCount}
          </span>
        </div>

        <div>
          <span class="text-xs text-txt-secondaryLight dark:text-txt-secondaryDark block">Total Days</span>
          <span class="text-lg font-mono font-bold text-txt-primaryLight dark:text-txt-primaryDark">
            {stats.totalDaysCount}
          </span>
        </div>
      </div>
    </div>

    <!-- Track Breakdown -->
    <div class="space-y-4">
      <!-- NT -->
      <div class="p-5 rounded-xl bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark shadow-sm">
        <div class="flex justify-between items-center mb-2">
          <div>
            <span class="text-xs font-bold text-track-nt uppercase tracking-wider block">New Testament</span>
            <span class="text-xs text-txt-secondaryLight dark:text-txt-secondaryDark">
              Rotation {stats.trackStats.new_testament.currentRotation} of 4 (4× per year target)
            </span>
          </div>
          <span class="text-lg font-serif font-bold text-track-nt">
            {stats.trackStats.new_testament.percentComplete}%
          </span>
        </div>
        <div class="w-full h-2 rounded-full bg-mutedSurface-light dark:bg-mutedSurface-dark overflow-hidden mb-2">
          <div class="h-full bg-track-nt rounded-full" style="width: {stats.trackStats.new_testament.percentComplete}%"></div>
        </div>
        <div class="flex justify-between text-xs text-txt-secondaryLight dark:text-txt-secondaryDark font-mono">
          <span>{stats.trackStats.new_testament.completedAssignments} / {stats.trackStats.new_testament.totalAssignments} chapters</span>
          <span>{stats.trackStats.new_testament.currentReference || 'Matthew 1'}</span>
        </div>
      </div>

      <!-- OT -->
      <div class="p-5 rounded-xl bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark shadow-sm">
        <div class="flex justify-between items-center mb-2">
          <div>
            <span class="text-xs font-bold text-track-ot uppercase tracking-wider block">Old Testament (excl. Psalms & Proverbs)</span>
            <span class="text-xs text-txt-secondaryLight dark:text-txt-secondaryDark">
              Rotation {stats.trackStats.old_testament.currentRotation} of 1 (1× per year target)
            </span>
          </div>
          <span class="text-lg font-serif font-bold text-track-ot">
            {stats.trackStats.old_testament.percentComplete}%
          </span>
        </div>
        <div class="w-full h-2 rounded-full bg-mutedSurface-light dark:bg-mutedSurface-dark overflow-hidden mb-2">
          <div class="h-full bg-track-ot rounded-full" style="width: {stats.trackStats.old_testament.percentComplete}%"></div>
        </div>
        <div class="flex justify-between text-xs text-txt-secondaryLight dark:text-txt-secondaryDark font-mono">
          <span>{stats.trackStats.old_testament.completedAssignments} / {stats.trackStats.old_testament.totalAssignments} chapters</span>
          <span>{stats.trackStats.old_testament.currentReference || 'Genesis 1'}</span>
        </div>
      </div>

      <!-- Psalms -->
      <div class="p-5 rounded-xl bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark shadow-sm">
        <div class="flex justify-between items-center mb-2">
          <div>
            <span class="text-xs font-bold text-track-psalms uppercase tracking-wider block">Psalms</span>
            <span class="text-xs text-txt-secondaryLight dark:text-txt-secondaryDark">
              Rotation {stats.trackStats.psalms.currentRotation} of 2 (2× per year target)
            </span>
          </div>
          <span class="text-lg font-serif font-bold text-track-psalms">
            {stats.trackStats.psalms.percentComplete}%
          </span>
        </div>
        <div class="w-full h-2 rounded-full bg-mutedSurface-light dark:bg-mutedSurface-dark overflow-hidden mb-2">
          <div class="h-full bg-track-psalms rounded-full" style="width: {stats.trackStats.psalms.percentComplete}%"></div>
        </div>
        <div class="flex justify-between text-xs text-txt-secondaryLight dark:text-txt-secondaryDark font-mono">
          <span>{stats.trackStats.psalms.completedAssignments} / {stats.trackStats.psalms.totalAssignments} chapters</span>
          <span>{stats.trackStats.psalms.currentReference || 'Psalm 1'}</span>
        </div>
      </div>

      <!-- Proverbs -->
      <div class="p-5 rounded-xl bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark shadow-sm">
        <div class="flex justify-between items-center mb-2">
          <div>
            <span class="text-xs font-bold text-track-proverbs uppercase tracking-wider block">Proverbs</span>
            <span class="text-xs text-txt-secondaryLight dark:text-txt-secondaryDark">
              Rotation {stats.trackStats.proverbs.currentRotation} of 4 (4× per year target)
            </span>
          </div>
          <span class="text-lg font-serif font-bold text-track-proverbs">
            {stats.trackStats.proverbs.percentComplete}%
          </span>
        </div>
        <div class="w-full h-2 rounded-full bg-mutedSurface-light dark:bg-mutedSurface-dark overflow-hidden mb-2">
          <div class="h-full bg-track-proverbs rounded-full" style="width: {stats.trackStats.proverbs.percentComplete}%"></div>
        </div>
        <div class="flex justify-between text-xs text-txt-secondaryLight dark:text-txt-secondaryDark font-mono">
          <span>{stats.trackStats.proverbs.completedAssignments} / {stats.trackStats.proverbs.totalAssignments} chapters</span>
          <span>{stats.trackStats.proverbs.currentReference || 'Proverbs 1'}</span>
        </div>
      </div>
    </div>
  {:else}
    <div class="p-12 text-center">
      <p class="text-xs text-txt-secondaryLight dark:text-txt-secondaryDark">Loading progress metrics...</p>
    </div>
  {/if}
</div>
