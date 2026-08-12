<script ts>
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { getDailyReadingByDate, getStudyNotesForDate, saveStudyNote } from '$lib/storage';
  import type { GeneratedReadingDay } from '$lib/readingPlan/types';
  import { formatHumanReference } from '$lib/bible/references';
  import { launchYouVersionPassage } from '$lib/youVersion';
  import { generateStudyBriefMarkdown, downloadMarkdownFile, openNotebookLM } from '$lib/notebookBridge';
  import { BookOpen, Copy, Download, ExternalLink, FileText, Save, Check } from 'lucide-svelte';

  $: dateParam = $page.params.date || '2026-08-12';

  let currentDay: GeneratedReadingDay | null = null;
  let dayNotes: Record<string, string> = {};
  let mainNoteText: string = '';
  let isSavedNotice: boolean = false;
  let isCopied: boolean = false;

  onMount(async () => {
    await loadData();
  });

  async function loadData() {
    currentDay = await getDailyReadingByDate(dateParam);
    dayNotes = await getStudyNotesForDate(dateParam);
    mainNoteText = dayNotes['DAY_NOTE'] || '';
  }

  async function handleSaveMainNote() {
    await saveStudyNote(dateParam, 'DAY_NOTE', mainNoteText);
    isSavedNotice = true;
    setTimeout(() => (isSavedNotice = false), 2000);
  }

  $: briefMarkdown = currentDay
    ? generateStudyBriefMarkdown({ day: currentDay, notes: dayNotes })
    : '';

  async function handleCopy() {
    await navigator.clipboard.writeText(briefMarkdown);
    isCopied = true;
    setTimeout(() => (isCopied = false), 2000);
  }

  function handleDownload() {
    downloadMarkdownFile(briefMarkdown, `study-${dateParam}.md`);
  }
</script>

<div class="space-y-6 animate-in fade-in duration-200">
  <div class="border-b border-border-light dark:border-border-dark pb-4 flex items-center justify-between">
    <div>
      <h1 class="text-2xl font-serif font-bold text-txt-primaryLight dark:text-txt-primaryDark">
        Study Workspace
      </h1>
      <p class="text-xs text-txt-secondaryLight dark:text-txt-secondaryDark mt-1">
        Date: {dateParam}
      </p>
    </div>

    <button
      on:click={openNotebookLM}
      class="px-3.5 py-2 text-xs font-medium rounded-lg bg-track-ot text-white hover:bg-opacity-90 transition-all flex items-center space-x-1.5 shadow-sm"
    >
      <span>NotebookLM</span>
      <ExternalLink class="w-3.5 h-3.5" />
    </button>
  </div>

  {#if currentDay}
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Left Column (2 cols on LG): Passages & Notes -->
      <div class="lg:col-span-2 space-y-6">
        <!-- Passages Overview -->
        <div class="p-5 rounded-2xl bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark shadow-sm">
          <h2 class="font-serif font-bold text-lg text-txt-primaryLight dark:text-txt-primaryDark mb-3">
            Assigned Passages
          </h2>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {#each currentDay.assignments as a}
              <button
                on:click={() => launchYouVersionPassage(a.bookCode, a.chapter)}
                class="p-3 rounded-xl bg-canvas-light/60 dark:bg-canvas-dark/60 border border-border-light/60 dark:border-border-dark/60 hover:border-track-nt text-left flex items-center justify-between text-xs font-medium transition-all group"
              >
                <div>
                  <span class="font-serif font-bold text-sm block">{formatHumanReference(a.bookCode, a.chapter)}</span>
                  <span class="text-[10px] text-txt-secondaryLight dark:text-txt-secondaryDark uppercase tracking-wider">
                    {a.trackSlug.replace('_', ' ')}
                  </span>
                </div>
                <ExternalLink class="w-3.5 h-3.5 text-txt-secondaryLight dark:text-txt-secondaryDark group-hover:text-track-nt" />
              </button>
            {/each}
          </div>
        </div>

        <!-- Main Daily Note Editor -->
        <div class="p-5 rounded-2xl bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark shadow-sm">
          <div class="flex items-center justify-between mb-3">
            <h2 class="font-serif font-bold text-lg text-txt-primaryLight dark:text-txt-primaryDark">
              Daily Study Observations
            </h2>
            {#if isSavedNotice}
              <span class="text-xs text-track-success font-medium animate-in fade-in">Saved</span>
            {/if}
          </div>

          <textarea
            bind:value={mainNoteText}
            placeholder="Record exegesis observations, cross-references, translation comparisons, or questions for NotebookLM study..."
            rows="6"
            class="w-full text-xs p-3 rounded-xl border border-border-light dark:border-border-dark bg-canvas-light dark:bg-canvas-dark text-txt-primaryLight dark:text-txt-primaryDark focus:outline-none focus:ring-1 focus:ring-track-nt"
          ></textarea>

          <div class="flex justify-end mt-3">
            <button
              on:click={handleSaveMainNote}
              class="px-4 py-2 text-xs font-medium rounded-lg bg-track-nt text-white hover:bg-opacity-90 transition-all flex items-center space-x-1.5 shadow-sm"
            >
              <Save class="w-3.5 h-3.5" />
              <span>Save Notes</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Right Panel: Export Controls -->
      <div class="space-y-6">
        <div class="p-5 rounded-2xl bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark shadow-sm sticky top-20">
          <h2 class="font-serif font-bold text-lg text-txt-primaryLight dark:text-txt-primaryDark mb-2">
            NotebookLM Bridge
          </h2>
          <p class="text-xs text-txt-secondaryLight dark:text-txt-secondaryDark mb-4">
            Export today's reading assignments and study instructions into NotebookLM.
          </p>

          <div class="space-y-2">
            <button
              on:click={handleCopy}
              class="w-full py-2.5 px-3 text-xs font-medium rounded-xl bg-track-nt text-white hover:bg-opacity-90 transition-all flex items-center justify-center space-x-2 shadow-sm"
            >
              {#if isCopied}
                <Check class="w-4 h-4" />
                <span>Brief Copied to Clipboard</span>
              {:else}
                <Copy class="w-4 h-4" />
                <span>Copy Study Brief</span>
              {/if}
            </button>

            <button
              on:click={handleDownload}
              class="w-full py-2.5 px-3 text-xs font-medium rounded-xl border border-border-light dark:border-border-dark bg-canvas-light dark:bg-canvas-dark text-txt-primaryLight dark:text-txt-primaryDark hover:bg-mutedSurface-light dark:hover:bg-mutedSurface-dark transition-all flex items-center justify-center space-x-2"
            >
              <Download class="w-4 h-4" />
              <span>Download .md File</span>
            </button>

            <button
              on:click={openNotebookLM}
              class="w-full py-2.5 px-3 text-xs font-medium rounded-xl border border-border-light dark:border-border-dark bg-track-ot/10 text-track-ot hover:bg-track-ot/20 transition-all flex items-center justify-center space-x-2"
            >
              <span>Open NotebookLM Web App</span>
              <ExternalLink class="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  {:else}
    <div class="p-12 text-center">
      <p class="text-xs text-txt-secondaryLight dark:text-txt-secondaryDark">Loading study workspace...</p>
    </div>
  {/if}
</div>
