<script ts>
  import '../app.css';
  import BottomNavigation from '$lib/components/BottomNavigation.svelte';
  import ThemeToggle from '$lib/components/ThemeToggle.svelte';
  import { BookOpen } from 'lucide-svelte';
</script>

<div class="min-h-screen bg-canvas-light dark:bg-canvas-dark text-txt-primaryLight dark:text-txt-primaryDark flex flex-col font-sans antialiased pb-20">
  <!-- Desktop / Tablet Top Brand Bar -->
  <header class="w-full border-b border-border-light dark:border-border-dark bg-surface-light/80 dark:bg-surface-dark/80 backdrop-blur-md sticky top-0 z-30 px-4 py-3">
    <div class="max-w-4xl mx-auto flex items-center justify-between">
      <a href="/today" class="flex items-center space-x-2.5">
        <div class="w-8 h-8 rounded-lg bg-track-nt flex items-center justify-center text-white shadow-sm">
          <BookOpen class="w-4 h-4" />
        </div>
        <div>
          <span class="font-serif font-bold text-lg text-txt-primaryLight dark:text-txt-primaryDark tracking-tight block leading-tight">
            Scripture Reading
          </span>
          <span class="text-[10px] font-sans font-medium text-txt-secondaryLight dark:text-txt-secondaryDark uppercase tracking-widest block">
            Four-Track High-Frequency PWA
          </span>
        </div>
      </a>

      <div class="flex items-center space-x-3">
        <ThemeToggle />
      </div>
    </div>
  </header>

  <!-- Main Content Surface -->
  <main class="flex-1 w-full max-w-4xl mx-auto px-4 py-6">
    <slot />
  </main>

  <!-- Bottom Navigation Bar -->
  <BottomNavigation />
</div>
