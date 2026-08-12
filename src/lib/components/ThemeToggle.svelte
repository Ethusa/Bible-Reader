<script ts>
  import { onMount } from 'svelte';
  import { Sun, Moon } from 'lucide-svelte';

  let isDark: boolean = false;

  onMount(() => {
    if (typeof window !== 'undefined') {
      isDark = document.documentElement.classList.contains('dark') ||
        window.matchMedia('(prefers-color-scheme: dark)').matches;
      updateTheme();
    }
  });

  function toggleTheme() {
    isDark = !isDark;
    updateTheme();
  }

  function updateTheme() {
    if (typeof window === 'undefined') return;
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }
</script>

<button
  type="button"
  on:click={toggleTheme}
  class="p-2 rounded-xl border border-border-light dark:border-border-dark text-txt-secondaryLight dark:text-txt-secondaryDark hover:bg-mutedSurface-light dark:hover:bg-mutedSurface-dark transition-colors"
  title="Toggle dark mode"
  aria-label="Toggle theme"
>
  {#if isDark}
    <Sun class="w-4 h-4 text-track-ot" />
  {:else}
    <Moon class="w-4 h-4 text-track-nt" />
  {/if}
</button>
