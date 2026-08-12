<script ts>
  import { X, Copy, Download, ExternalLink, FileText, Check } from 'lucide-svelte';
  import type { GeneratedReadingDay } from '../readingPlan/types';
  import {
    generateStudyBriefMarkdown,
    downloadMarkdownFile,
    openNotebookLM,
    DEFAULT_SCHOLARLY_INSTRUCTIONS
  } from '../notebookBridge';

  export let isOpen: boolean = false;
  export let day: GeneratedReadingDay;
  export let notes: Record<string, string> = {};
  export let onClose: () => void = () => {};

  let copiedBrief: boolean = false;
  let copiedInstructions: boolean = false;

  $: markdownContent = day ? generateStudyBriefMarkdown({ day, notes, includeInstructions: true }) : '';

  async function handleCopyBrief() {
    if (!markdownContent) return;
    await navigator.clipboard.writeText(markdownContent);
    copiedBrief = true;
    setTimeout(() => (copiedBrief = false), 2000);
  }

  async function handleCopyInstructions() {
    await navigator.clipboard.writeText(DEFAULT_SCHOLARLY_INSTRUCTIONS);
    copiedInstructions = true;
    setTimeout(() => (copiedInstructions = false), 2000);
  }

  function handleDownload() {
    if (!markdownContent || !day) return;
    const filename = `study-brief-${day.date}.md`;
    downloadMarkdownFile(markdownContent, filename);
  }
</script>

{#if isOpen && day}
  <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-150">
    <div class="w-full max-w-2xl rounded-2xl bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark p-6 shadow-xl max-h-[90vh] flex flex-col">
      <!-- Header -->
      <div class="flex items-center justify-between pb-4 border-b border-border-light dark:border-border-dark mb-4">
        <div class="flex items-center space-x-2">
          <FileText class="w-5 h-5 text-track-nt" />
          <h2 class="text-xl font-serif font-bold text-txt-primaryLight dark:text-txt-primaryDark">
            NotebookLM Study Brief ({day.date})
          </h2>
        </div>
        <button
          on:click={onClose}
          class="p-1.5 rounded-lg text-txt-secondaryLight dark:text-txt-secondaryDark hover:bg-mutedSurface-light dark:hover:bg-mutedSurface-dark"
        >
          <X class="w-5 h-5" />
        </button>
      </div>

      <!-- Action Buttons Top Bar -->
      <div class="flex flex-wrap gap-2 mb-4">
        <button
          on:click={handleCopyBrief}
          class="px-3 py-2 text-xs font-medium rounded-lg bg-track-nt text-white hover:bg-opacity-90 transition-all flex items-center space-x-1.5 shadow-sm"
        >
          {#if copiedBrief}
            <Check class="w-3.5 h-3.5" />
            <span>Brief Copied!</span>
          {:else}
            <Copy class="w-3.5 h-3.5" />
            <span>Copy Study Brief</span>
          {/if}
        </button>

        <button
          on:click={handleDownload}
          class="px-3 py-2 text-xs font-medium rounded-lg border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark text-txt-primaryLight dark:text-txt-primaryDark hover:bg-mutedSurface-light dark:hover:bg-mutedSurface-dark transition-all flex items-center space-x-1.5"
        >
          <Download class="w-3.5 h-3.5" />
          <span>Download .md</span>
        </button>

        <button
          on:click={handleCopyInstructions}
          class="px-3 py-2 text-xs font-medium rounded-lg border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark text-txt-secondaryLight dark:text-txt-secondaryDark hover:bg-mutedSurface-light dark:hover:bg-mutedSurface-dark transition-all flex items-center space-x-1.5"
        >
          {#if copiedInstructions}
            <Check class="w-3.5 h-3.5 text-track-success" />
            <span>Instructions Copied!</span>
          {:else}
            <Copy class="w-3.5 h-3.5" />
            <span>Copy Prompt Only</span>
          {/if}
        </button>

        <button
          on:click={openNotebookLM}
          class="px-3 py-2 text-xs font-medium rounded-lg bg-track-ot text-white hover:bg-opacity-90 transition-all flex items-center space-x-1.5 ml-auto shadow-sm"
        >
          <span>Open NotebookLM</span>
          <ExternalLink class="w-3.5 h-3.5" />
        </button>
      </div>

      <!-- Markdown Preview Box -->
      <div class="flex-1 min-h-[220px] overflow-y-auto p-4 rounded-xl bg-canvas-light dark:bg-canvas-dark border border-border-light dark:border-border-dark font-mono text-xs text-txt-primaryLight dark:text-txt-primaryDark whitespace-pre-wrap">
        {markdownContent}
      </div>

      <!-- Footer -->
      <div class="mt-4 pt-3 border-t border-border-light dark:border-border-dark flex justify-between items-center text-xs text-txt-secondaryLight dark:text-txt-secondaryDark">
        <span>Paste this document directly into NotebookLM as a text source.</span>
        <button
          on:click={onClose}
          class="px-4 py-1.5 rounded-lg bg-mutedSurface-light dark:bg-mutedSurface-dark hover:bg-border-light dark:hover:bg-border-dark text-txt-primaryLight dark:text-txt-primaryDark font-medium"
        >
          Done
        </button>
      </div>
    </div>
  </div>
{/if}
