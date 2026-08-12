<script ts>
  import { CheckCircle2, BookOpen } from 'lucide-svelte';

  export let completedCount: number = 0;
  export let totalCount: number = 0;

  $: percent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
  $: isFinished = totalCount > 0 && completedCount === totalCount;
</script>

<div class="mb-6 rounded-xl bg-surface-light dark:bg-surface-dark p-4 border border-border-light dark:border-border-dark shadow-sm">
  <div class="flex items-center justify-between mb-2">
    <div class="flex items-center space-x-2">
      <BookOpen class="w-4 h-4 text-track-nt" />
      <span class="text-xs font-semibold uppercase tracking-wider text-txt-secondaryLight dark:text-txt-secondaryDark">
        Today's Reading Progress
      </span>
    </div>
    <span class="text-xs font-mono font-medium text-txt-primaryLight dark:text-txt-primaryDark">
      {completedCount} of {totalCount} chapters ({percent}%)
    </span>
  </div>

  <!-- Progress Bar -->
  <div class="w-full h-2 rounded-full bg-mutedSurface-light dark:bg-mutedSurface-dark overflow-hidden">
    <div
      class="h-full rounded-full transition-all duration-300 ease-out bg-track-nt"
      style="width: {percent}%"
    ></div>
  </div>

  {#if isFinished}
    <div class="mt-3 p-2.5 rounded-lg bg-track-success/10 border border-track-success/20 flex items-center justify-center space-x-2 text-track-success text-xs font-medium animate-in fade-in duration-200">
      <CheckCircle2 class="w-4 h-4" />
      <span>Today's reading is complete.</span>
    </div>
  {/if}
</div>
