<script ts>
  import { Calendar, ChevronLeft, ChevronRight } from 'lucide-svelte';

  export let selectedDateStr: string = '2026-08-12';
  export let dayNumber: number = 224;
  export let totalDays: number = 365;
  export let onPrevDay: () => void = () => {};
  export let onNextDay: () => void = () => {};
  export let onGoToday: () => void = () => {};
  export let isToday: boolean = true;

  $: dateObj = new Date(selectedDateStr + 'T00:00:00');
  $: dayOfWeek = dateObj.toLocaleDateString('en-US', { weekday: 'long' });
  $: formattedDate = dateObj.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
</script>

<header class="w-full pb-4 border-b border-border-light dark:border-border-dark mb-6">
  <div class="flex items-center justify-between">
    <div>
      <p class="text-xs font-semibold tracking-wider text-txt-secondaryLight dark:text-txt-secondaryDark uppercase">
        {dayOfWeek}
      </p>
      <h1 class="text-2xl md:text-3xl font-serif font-bold text-txt-primaryLight dark:text-txt-primaryDark mt-0.5">
        {formattedDate}
      </h1>
      <p class="text-xs text-txt-secondaryLight dark:text-txt-secondaryDark mt-1">
        Day {dayNumber} of {totalDays}
      </p>
    </div>

    <!-- Date Controls -->
    <div class="flex items-center space-x-1 sm:space-x-2">
      <button
        on:click={onPrevDay}
        class="p-2 rounded-lg text-txt-secondaryLight dark:text-txt-secondaryDark hover:bg-mutedSurface-light dark:hover:bg-mutedSurface-dark transition-colors"
        aria-label="Previous day"
      >
        <ChevronLeft class="w-5 h-5" />
      </button>

      {#if !isToday}
        <button
          on:click={onGoToday}
          class="px-3 py-1.5 text-xs font-medium rounded-lg bg-track-nt text-white hover:bg-opacity-90 transition-all shadow-sm flex items-center space-x-1"
        >
          <Calendar class="w-3.5 h-3.5" />
          <span>Today</span>
        </button>
      {/if}

      <button
        on:click={onNextDay}
        class="p-2 rounded-lg text-txt-secondaryLight dark:text-txt-secondaryDark hover:bg-mutedSurface-light dark:hover:bg-mutedSurface-dark transition-colors"
        aria-label="Next day"
      >
        <ChevronRight class="w-5 h-5" />
      </button>
    </div>
  </div>
</header>
