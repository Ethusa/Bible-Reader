<script ts>
  import { goto } from '$app/navigation';
  import { BookOpen, Calendar, Check, ArrowRight } from 'lucide-svelte';

  let step: number = 1;
  let selectedYear: number = 2026;
  let startDateOption: 'jan1' | 'today' = 'jan1';
  let customStartDate: string = '2026-01-01';
  let timezone: string = 'UTC';

  function handleStartPlan() {
    step = 2;
  }

  function handleConfigure() {
    step = 3;
  }

  function handleGenerate() {
    goto('/today');
  }
</script>

<div class="max-w-xl mx-auto py-6 animate-in fade-in duration-200">
  {#if step === 1}
    <!-- Screen 1: Vision & Intro -->
    <div class="text-center space-y-6">
      <div class="w-12 h-12 rounded-2xl bg-track-nt flex items-center justify-center text-white mx-auto shadow-md">
        <BookOpen class="w-6 h-6" />
      </div>

      <h1 class="text-2xl sm:text-3xl font-serif font-bold text-txt-primaryLight dark:text-txt-primaryDark leading-tight">
        Read the whole Bible repeatedly, without planning every day.
      </h1>

      <p class="text-xs sm:text-sm text-txt-secondaryLight dark:text-txt-secondaryDark max-w-md mx-auto">
        A continuous four-track Scripture system delivering daily chapters across different annual frequencies.
      </p>

      <!-- Track Cards Preview -->
      <div class="grid grid-cols-2 gap-3 text-left pt-2">
        <div class="p-3.5 rounded-xl bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark">
          <span class="text-xs font-bold text-track-nt uppercase tracking-wider block">New Testament</span>
          <span class="text-xs text-txt-secondaryLight dark:text-txt-secondaryDark">4× per year</span>
        </div>

        <div class="p-3.5 rounded-xl bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark">
          <span class="text-xs font-bold text-track-ot uppercase tracking-wider block">Old Testament</span>
          <span class="text-xs text-txt-secondaryLight dark:text-txt-secondaryDark">1× per year (excl. Psa/Pro)</span>
        </div>

        <div class="p-3.5 rounded-xl bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark">
          <span class="text-xs font-bold text-track-psalms uppercase tracking-wider block">Psalms</span>
          <span class="text-xs text-txt-secondaryLight dark:text-txt-secondaryDark">2× per year</span>
        </div>

        <div class="p-3.5 rounded-xl bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark">
          <span class="text-xs font-bold text-track-proverbs uppercase tracking-wider block">Proverbs</span>
          <span class="text-xs text-txt-secondaryLight dark:text-txt-secondaryDark">4× per year</span>
        </div>
      </div>

      <div class="pt-4">
        <button
          on:click={handleStartPlan}
          class="w-full py-3 px-6 font-medium text-sm rounded-xl bg-track-nt text-white hover:bg-opacity-90 transition-all flex items-center justify-center space-x-2 shadow-md"
        >
          <span>Start my reading plan</span>
          <ArrowRight class="w-4 h-4" />
        </button>
      </div>
    </div>
  {:else if step === 2}
    <!-- Screen 2: Year & Start Date Configuration -->
    <div class="space-y-6">
      <div class="text-center">
        <h2 class="text-2xl font-serif font-bold text-txt-primaryLight dark:text-txt-primaryDark">
          Configure Reading Year
        </h2>
        <p class="text-xs text-txt-secondaryLight dark:text-txt-secondaryDark mt-1">
          Select your reading plan calendar year and starting point.
        </p>
      </div>

      <div class="p-6 rounded-2xl bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark space-y-4 shadow-sm">
        <div>
          <label class="block text-xs font-semibold uppercase tracking-wider text-txt-secondaryLight dark:text-txt-secondaryDark mb-1.5">
            Reading Year
          </label>
          <select
            bind:value={selectedYear}
            class="w-full text-xs p-3 rounded-xl border border-border-light dark:border-border-dark bg-canvas-light dark:bg-canvas-dark text-txt-primaryLight dark:text-txt-primaryDark focus:outline-none focus:ring-1 focus:ring-track-nt"
          >
            <option value={2026}>2026 (Standard 365 Days)</option>
            <option value={2027}>2027 (Standard 365 Days)</option>
            <option value={2028}>2028 (Leap Year 366 Days)</option>
          </select>
        </div>

        <div>
          <label class="block text-xs font-semibold uppercase tracking-wider text-txt-secondaryLight dark:text-txt-secondaryDark mb-1.5">
            Start Date Option
          </label>
          <div class="grid grid-cols-2 gap-2">
            <button
              type="button"
              on:click={() => (startDateOption = 'jan1')}
              class="p-3 rounded-xl border text-xs font-medium transition-all text-left {startDateOption === 'jan1'
                ? 'border-track-nt bg-track-nt/10 text-track-nt font-bold'
                : 'border-border-light dark:border-border-dark bg-canvas-light dark:bg-canvas-dark text-txt-secondaryLight dark:text-txt-secondaryDark'}"
            >
              January 1 Schedule
            </button>
            <button
              type="button"
              on:click={() => (startDateOption = 'today')}
              class="p-3 rounded-xl border text-xs font-medium transition-all text-left {startDateOption === 'today'
                ? 'border-track-nt bg-track-nt/10 text-track-nt font-bold'
                : 'border-border-light dark:border-border-dark bg-canvas-light dark:bg-canvas-dark text-txt-secondaryLight dark:text-txt-secondaryDark'}"
            >
              Today's Date Start
            </button>
          </div>
        </div>

        <div>
          <label class="block text-xs font-semibold uppercase tracking-wider text-txt-secondaryLight dark:text-txt-secondaryDark mb-1.5">
            Timezone
          </label>
          <input
            type="text"
            bind:value={timezone}
            class="w-full text-xs p-3 rounded-xl border border-border-light dark:border-border-dark bg-canvas-light dark:bg-canvas-dark text-txt-primaryLight dark:text-txt-primaryDark focus:outline-none focus:ring-1 focus:ring-track-nt"
          />
        </div>
      </div>

      <div class="flex space-x-3">
        <button
          on:click={() => (step = 1)}
          class="w-1/3 py-3 font-medium text-xs rounded-xl border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark text-txt-secondaryLight dark:text-txt-secondaryDark"
        >
          Back
        </button>
        <button
          on:click={handleConfigure}
          class="w-2/3 py-3 font-medium text-xs rounded-xl bg-track-nt text-white hover:bg-opacity-90 transition-all flex items-center justify-center space-x-1 shadow-md"
        >
          <span>Continue</span>
          <ArrowRight class="w-4 h-4" />
        </button>
      </div>
    </div>
  {:else if step === 3}
    <!-- Screen 3: Rhythm Summary -->
    <div class="space-y-6">
      <div class="text-center">
        <h2 class="text-2xl font-serif font-bold text-txt-primaryLight dark:text-txt-primaryDark">
          Your Daily Rhythm
        </h2>
        <p class="text-xs text-txt-secondaryLight dark:text-txt-secondaryDark mt-1">
          Deterministic daily chapter distribution summary.
        </p>
      </div>

      <div class="p-6 rounded-2xl bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark space-y-4 shadow-sm">
        <div class="flex justify-between items-center pb-3 border-b border-border-light/50 dark:border-border-dark/50">
          <div>
            <span class="text-xs font-bold text-track-nt uppercase tracking-wider block">New Testament</span>
            <span class="text-xs text-txt-secondaryLight dark:text-txt-secondaryDark">4 rotations/year</span>
          </div>
          <span class="text-sm font-mono font-bold text-txt-primaryLight dark:text-txt-primaryDark">~3 chapters/day</span>
        </div>

        <div class="flex justify-between items-center pb-3 border-b border-border-light/50 dark:border-border-dark/50">
          <div>
            <span class="text-xs font-bold text-track-ot uppercase tracking-wider block">Old Testament</span>
            <span class="text-xs text-txt-secondaryLight dark:text-txt-secondaryDark">1 rotation/year</span>
          </div>
          <span class="text-sm font-mono font-bold text-txt-primaryLight dark:text-txt-primaryDark">~2 chapters/day</span>
        </div>

        <div class="flex justify-between items-center pb-3 border-b border-border-light/50 dark:border-border-dark/50">
          <div>
            <span class="text-xs font-bold text-track-psalms uppercase tracking-wider block">Psalms</span>
            <span class="text-xs text-txt-secondaryLight dark:text-txt-secondaryDark">2 rotations/year</span>
          </div>
          <span class="text-sm font-mono font-bold text-txt-primaryLight dark:text-txt-primaryDark">~1 Psalm/day</span>
        </div>

        <div class="flex justify-between items-center">
          <div>
            <span class="text-xs font-bold text-track-proverbs uppercase tracking-wider block">Proverbs</span>
            <span class="text-xs text-txt-secondaryLight dark:text-txt-secondaryDark">4 rotations/year</span>
          </div>
          <span class="text-sm font-mono font-bold text-txt-primaryLight dark:text-txt-primaryDark">Every ~3 days</span>
        </div>
      </div>

      <button
        on:click={handleGenerate}
        class="w-full py-3.5 px-6 font-medium text-sm rounded-xl bg-track-nt text-white hover:bg-opacity-90 transition-all flex items-center justify-center space-x-2 shadow-md"
      >
        <Check class="w-4 h-4" />
        <span>Generate my plan</span>
      </button>
    </div>
  {/if}
</div>
