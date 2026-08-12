<script ts>
  import { X, ExternalLink, Volume2, BookOpen } from 'lucide-svelte';
  import type { GeneratedAssignment } from '../readingPlan/types';
  import { formatHumanReference } from '../bible/references';
  import { launchYouVersionPassage } from '../youVersion';

  export let isOpen: boolean = false;
  export let assignments: GeneratedAssignment[] = [];
  export let onClose: () => void = () => {};

  $: ntAssignments = assignments.filter((a) => a.trackSlug === 'new_testament');
  $: otAssignments = assignments.filter((a) => a.trackSlug === 'old_testament');
  $: psalmsAssignments = assignments.filter((a) => a.trackSlug === 'psalms');
  $: proverbsAssignments = assignments.filter((a) => a.trackSlug === 'proverbs');

  function handleLaunch(bookCode: string, chapter: number) {
    launchYouVersionPassage(bookCode, chapter);
  }
</script>

{#if isOpen}
  <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-150">
    <div class="w-full max-w-lg rounded-2xl bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark p-6 shadow-xl max-h-[90vh] overflow-y-auto">
      <!-- Header -->
      <div class="flex items-center justify-between pb-4 border-b border-border-light dark:border-border-dark mb-4">
        <div class="flex items-center space-x-2">
          <BookOpen class="w-5 h-5 text-track-nt" />
          <h2 class="text-xl font-serif font-bold text-txt-primaryLight dark:text-txt-primaryDark">
            Today's Assigned Passages
          </h2>
        </div>
        <button
          on:click={onClose}
          class="p-1.5 rounded-lg text-txt-secondaryLight dark:text-txt-secondaryDark hover:bg-mutedSurface-light dark:hover:bg-mutedSurface-dark"
        >
          <X class="w-5 h-5" />
        </button>
      </div>

      <p class="text-xs text-txt-secondaryLight dark:text-txt-secondaryDark mb-4">
        Tap any passage below to open it in YouVersion ESV.
      </p>

      <div class="space-y-4">
        <!-- New Testament -->
        {#if ntAssignments.length > 0}
          <div class="p-3 rounded-xl bg-mutedSurface-light/50 dark:bg-mutedSurface-dark/50 border border-border-light dark:border-border-dark">
            <span class="text-xs font-bold text-track-nt uppercase tracking-wider block mb-2">
              New Testament
            </span>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {#each ntAssignments as a}
                <button
                  on:click={() => handleLaunch(a.bookCode, a.chapter)}
                  class="p-2.5 rounded-lg bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark hover:border-track-nt text-left flex items-center justify-between text-xs font-medium text-txt-primaryLight dark:text-txt-primaryDark transition-all"
                >
                  <span>{formatHumanReference(a.bookCode, a.chapter)}</span>
                  <Volume2 class="w-3.5 h-3.5 text-track-nt shrink-0" />
                </button>
              {/each}
            </div>
          </div>
        {/if}

        <!-- Old Testament -->
        {#if otAssignments.length > 0}
          <div class="p-3 rounded-xl bg-mutedSurface-light/50 dark:bg-mutedSurface-dark/50 border border-border-light dark:border-border-dark">
            <span class="text-xs font-bold text-track-ot uppercase tracking-wider block mb-2">
              Old Testament
            </span>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {#each otAssignments as a}
                <button
                  on:click={() => handleLaunch(a.bookCode, a.chapter)}
                  class="p-2.5 rounded-lg bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark hover:border-track-ot text-left flex items-center justify-between text-xs font-medium text-txt-primaryLight dark:text-txt-primaryDark transition-all"
                >
                  <span>{formatHumanReference(a.bookCode, a.chapter)}</span>
                  <Volume2 class="w-3.5 h-3.5 text-track-ot shrink-0" />
                </button>
              {/each}
            </div>
          </div>
        {/if}

        <!-- Psalms -->
        {#if psalmsAssignments.length > 0}
          <div class="p-3 rounded-xl bg-mutedSurface-light/50 dark:bg-mutedSurface-dark/50 border border-border-light dark:border-border-dark">
            <span class="text-xs font-bold text-track-psalms uppercase tracking-wider block mb-2">
              Psalms
            </span>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {#each psalmsAssignments as a}
                <button
                  on:click={() => handleLaunch(a.bookCode, a.chapter)}
                  class="p-2.5 rounded-lg bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark hover:border-track-psalms text-left flex items-center justify-between text-xs font-medium text-txt-primaryLight dark:text-txt-primaryDark transition-all"
                >
                  <span>{formatHumanReference(a.bookCode, a.chapter)}</span>
                  <Volume2 class="w-3.5 h-3.5 text-track-psalms shrink-0" />
                </button>
              {/each}
            </div>
          </div>
        {/if}

        <!-- Proverbs -->
        {#if proverbsAssignments.length > 0}
          <div class="p-3 rounded-xl bg-mutedSurface-light/50 dark:bg-mutedSurface-dark/50 border border-border-light dark:border-border-dark">
            <span class="text-xs font-bold text-track-proverbs uppercase tracking-wider block mb-2">
              Proverbs
            </span>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {#each proverbsAssignments as a}
                <button
                  on:click={() => handleLaunch(a.bookCode, a.chapter)}
                  class="p-2.5 rounded-lg bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark hover:border-track-proverbs text-left flex items-center justify-between text-xs font-medium text-txt-primaryLight dark:text-txt-primaryDark transition-all"
                >
                  <span>{formatHumanReference(a.bookCode, a.chapter)}</span>
                  <Volume2 class="w-3.5 h-3.5 text-track-proverbs shrink-0" />
                </button>
              {/each}
            </div>
          </div>
        {/if}
      </div>

      <div class="mt-6 flex justify-end">
        <button
          on:click={onClose}
          class="px-4 py-2 text-xs font-medium rounded-lg bg-mutedSurface-light dark:bg-mutedSurface-dark text-txt-primaryLight dark:text-txt-primaryDark hover:bg-border-light dark:hover:bg-border-dark"
        >
          Close
        </button>
      </div>
    </div>
  </div>
{/if}
