<script ts>
  import { onMount } from 'svelte';
  import { getUnfinishedReadings, toggleAssignmentCompletion } from '$lib/storage';
  import type { GeneratedAssignment } from '$lib/readingPlan/types';
  import { formatHumanReference } from '$lib/bible/references';
  import { launchYouVersionPassage } from '$lib/youVersion';
  import { CheckCircle2, Volume2, Clock } from 'lucide-svelte';

  let unfinishedList: { date: string; assignments: GeneratedAssignment[] }[] = [];

  onMount(async () => {
    await loadData();
  });

  async function loadData() {
    unfinishedList = await getUnfinishedReadings();
  }

  async function handleMarkComplete(assignmentId: string) {
    await toggleAssignmentCompletion(assignmentId, true);
    await loadData();
  }

  function handleOpen(bookCode: string, chapter: number) {
    launchYouVersionPassage(bookCode, chapter);
  }
</script>

<div class="space-y-6 animate-in fade-in duration-200">
  <div class="border-b border-border-light dark:border-border-dark pb-4">
    <h1 class="text-2xl font-serif font-bold text-txt-primaryLight dark:text-txt-primaryDark">
      Catch-Up View
    </h1>
    <p class="text-xs text-txt-secondaryLight dark:text-txt-secondaryDark mt-1">
      Unfinished readings from past days. Completing past readings here leaves future assignments unchanged.
    </p>
  </div>

  {#if unfinishedList.length > 0}
    <div class="space-y-4">
      {#each unfinishedList as dayGroup (dayGroup.date)}
        <div class="p-5 rounded-2xl bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark shadow-sm">
          <div class="flex items-center justify-between pb-3 border-b border-border-light/50 dark:border-border-dark/50 mb-3">
            <div class="flex items-center space-x-2">
              <Clock class="w-4 h-4 text-track-ot" />
              <h2 class="font-serif font-bold text-base text-txt-primaryLight dark:text-txt-primaryDark">
                {dayGroup.date}
              </h2>
            </div>
            <span class="text-xs font-mono text-txt-secondaryLight dark:text-txt-secondaryDark">
              {dayGroup.assignments.length} unfinished
            </span>
          </div>

          <div class="space-y-2">
            {#each dayGroup.assignments as a (a.id || a.displayOrder)}
              <div class="flex items-center justify-between p-3 rounded-xl bg-canvas-light/50 dark:bg-canvas-dark/50 border border-border-light/50 dark:border-border-dark/50">
                <div>
                  <span class="font-serif font-medium text-sm text-txt-primaryLight dark:text-txt-primaryDark">
                    {formatHumanReference(a.bookCode, a.chapter)}
                  </span>
                  <span class="text-[10px] font-sans text-txt-secondaryLight dark:text-txt-secondaryDark block uppercase tracking-wider">
                    {a.trackSlug.replace('_', ' ')} (Rotation {a.rotationNumber})
                  </span>
                </div>

                <div class="flex items-center space-x-2">
                  <button
                    on:click={() => handleOpen(a.bookCode, a.chapter)}
                    class="px-2.5 py-1.5 rounded-lg text-xs font-medium border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark text-txt-primaryLight dark:text-txt-primaryDark hover:bg-mutedSurface-light dark:hover:bg-mutedSurface-dark transition-all flex items-center space-x-1"
                  >
                    <Volume2 class="w-3.5 h-3.5 text-track-nt" />
                    <span class="hidden sm:inline">Open</span>
                  </button>

                  <button
                    on:click={() => handleMarkComplete(a.id || '')}
                    class="px-3 py-1.5 rounded-lg text-xs font-medium bg-track-success text-white hover:bg-opacity-90 transition-all flex items-center space-x-1 shadow-sm"
                  >
                    <CheckCircle2 class="w-3.5 h-3.5" />
                    <span>Mark Complete</span>
                  </button>
                </div>
              </div>
            {/each}
          </div>
        </div>
      {/each}
    </div>
  {:else}
    <div class="p-12 text-center rounded-2xl bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark shadow-sm">
      <CheckCircle2 class="w-12 h-12 text-track-success mx-auto mb-3 opacity-90" />
      <h2 class="text-xl font-serif font-bold text-txt-primaryLight dark:text-txt-primaryDark">
        You're caught up.
      </h2>
      <p class="text-xs text-txt-secondaryLight dark:text-txt-secondaryDark mt-1 max-w-sm mx-auto">
        All readings from past calendar dates have been completed. Great work staying consistent!
      </p>
    </div>
  {/if}
</div>
