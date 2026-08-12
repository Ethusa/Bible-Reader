<script ts>
  import { Check, ExternalLink, MessageSquare, Volume2 } from 'lucide-svelte';
  import { formatHumanReference } from '../bible/references';
  import { launchYouVersionPassage } from '../youVersion';

  export let assignmentId: string;
  export let bookCode: string;
  export let chapter: number;
  export let completed: boolean = false;
  export let accentColor: string = '#536B92';
  export let noteText: string = '';
  export let onToggleComplete: (id: string, newCompleted: boolean) => void = () => {};
  export let onSaveNote: (refKey: string, note: string) => void = () => {};

  let showNoteBox: boolean = false;
  let currentNote: string = noteText;

  $: refText = formatHumanReference(bookCode, chapter);
  $: refKey = `${bookCode}.${chapter}`;

  function handleCheckToggle() {
    onToggleComplete(assignmentId, !completed);
  }

  function handleLaunchYouVersion() {
    launchYouVersionPassage(bookCode, chapter);
  }

  function handleSaveNote() {
    onSaveNote(refKey, currentNote);
    showNoteBox = false;
  }
</script>

<div class="py-3 px-3 sm:px-4 rounded-xl transition-all hover:bg-mutedSurface-light dark:hover:bg-mutedSurface-dark border border-transparent hover:border-border-light dark:hover:border-border-dark group">
  <div class="flex items-center justify-between">
    <!-- Left: Checkbox + Reference -->
    <div class="flex items-center space-x-3.5 min-w-0">
      <button
        type="button"
        on:click={handleCheckToggle}
        class="w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-track-nt shrink-0"
        style="border-color: {completed ? accentColor : 'currentColor'}; background-color: {completed ? accentColor : 'transparent'}; text-color: {completed ? '#FFFFFF' : 'inherit'}"
        aria-label="Toggle completion for {refText}"
      >
        {#if completed}
          <Check class="w-4 h-4 text-white animate-in zoom-in-50 duration-150" />
        {/if}
      </button>

      <div class="min-w-0">
        <span
          class="font-serif text-lg font-medium tracking-tight block truncate transition-all {completed ? 'line-through opacity-60 text-txt-secondaryLight dark:text-txt-secondaryDark' : 'text-txt-primaryLight dark:text-txt-primaryDark'}"
        >
          {refText}
        </span>
        {#if noteText && !showNoteBox}
          <p class="text-xs text-txt-secondaryLight dark:text-txt-secondaryDark italic truncate max-w-xs sm:max-w-md mt-0.5">
            "{noteText}"
          </p>
        {/if}
      </div>
    </div>

    <!-- Right: Actions -->
    <div class="flex items-center space-x-2 shrink-0">
      <button
        type="button"
        on:click={() => (showNoteBox = !showNoteBox)}
        class="p-2 rounded-lg text-txt-secondaryLight dark:text-txt-secondaryDark hover:bg-surface-light dark:hover:bg-surface-dark transition-colors"
        title="Add study note"
      >
        <MessageSquare class="w-4 h-4 {noteText ? 'text-track-ot fill-track-ot/20' : ''}" />
      </button>

      <button
        type="button"
        on:click={handleLaunchYouVersion}
        class="px-2.5 py-1.5 rounded-lg text-xs font-medium border border-border-light dark:border-border-dark text-txt-secondaryLight dark:text-txt-secondaryDark hover:text-txt-primaryLight dark:hover:text-txt-primaryDark hover:bg-surface-light dark:hover:bg-surface-dark transition-all flex items-center space-x-1.5"
      >
        <Volume2 class="w-3.5 h-3.5 text-track-nt" />
        <span class="hidden sm:inline">Listen ESV</span>
        <ExternalLink class="w-3 h-3 opacity-60" />
      </button>
    </div>
  </div>

  <!-- Inline Note Editor -->
  {#if showNoteBox}
    <div class="mt-3 pt-3 border-t border-border-light dark:border-border-dark animate-in fade-in duration-150">
      <textarea
        bind:value={currentNote}
        placeholder="Add observation, question, or study note for {refText}..."
        rows="2"
        class="w-full text-xs p-2.5 rounded-lg border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark text-txt-primaryLight dark:text-txt-primaryDark focus:outline-none focus:ring-1 focus:ring-track-nt"
      ></textarea>
      <div class="flex justify-end space-x-2 mt-2">
        <button
          type="button"
          on:click={() => (showNoteBox = false)}
          class="px-2.5 py-1 text-xs text-txt-secondaryLight dark:text-txt-secondaryDark hover:underline"
        >
          Cancel
        </button>
        <button
          type="button"
          on:click={handleSaveNote}
          class="px-3 py-1 text-xs font-medium rounded-md bg-track-nt text-white hover:bg-opacity-90 transition-colors"
        >
          Save Note
        </button>
      </div>
    </div>
  {/if}
</div>
