<script ts>
  import { Settings, Shield, RefreshCw, Moon, Sun, Database, BookOpen } from 'lucide-svelte';

  let activeYear: number = 2026;
  let translation: string = 'ESV (English Standard Version)';
  let defaultTheme: string = 'system';
  let timezone: string = 'UTC';
  let isSupabaseConnected: boolean = false;
  let showRegenerateConfirm: boolean = false;

  function handleRegeneratePlan() {
    showRegenerateConfirm = false;
    alert('Reading plan regenerated successfully. Completion history preserved.');
  }
</script>

<div class="space-y-6 animate-in fade-in duration-200">
  <div class="border-b border-border-light dark:border-border-dark pb-4">
    <h1 class="text-2xl font-serif font-bold text-txt-primaryLight dark:text-txt-primaryDark">
      Application Settings
    </h1>
    <p class="text-xs text-txt-secondaryLight dark:text-txt-secondaryDark mt-1">
      Manage reading plan, translation, study preferences, and data persistence.
    </p>
  </div>

  <div class="space-y-6">
    <!-- Section 1: Reading Plan -->
    <div class="p-5 rounded-2xl bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark shadow-sm space-y-4">
      <h2 class="font-serif font-bold text-lg text-txt-primaryLight dark:text-txt-primaryDark flex items-center space-x-2">
        <BookOpen class="w-4 h-4 text-track-nt" />
        <span>Reading Plan</span>
      </h2>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
        <div>
          <label class="block text-txt-secondaryLight dark:text-txt-secondaryDark font-medium mb-1">
            Active Reading Year
          </label>
          <span class="font-mono font-bold text-txt-primaryLight dark:text-txt-primaryDark block p-2.5 rounded-lg bg-canvas-light dark:bg-canvas-dark border border-border-light dark:border-border-dark">
            2026 (365 Days)
          </span>
        </div>

        <div>
          <label class="block text-txt-secondaryLight dark:text-txt-secondaryDark font-medium mb-1">
            System Plan
          </label>
          <span class="font-mono text-txt-primaryLight dark:text-txt-primaryDark block p-2.5 rounded-lg bg-canvas-light dark:bg-canvas-dark border border-border-light dark:border-border-dark">
            Four-Track High-Frequency
          </span>
        </div>
      </div>

      <div class="pt-2 border-t border-border-light/60 dark:border-border-dark/60">
        {#if !showRegenerateConfirm}
          <button
            on:click={() => (showRegenerateConfirm = true)}
            class="px-3.5 py-2 rounded-lg text-xs font-medium border border-border-light dark:border-border-dark text-txt-secondaryLight dark:text-txt-secondaryDark hover:bg-mutedSurface-light dark:hover:bg-mutedSurface-dark transition-all flex items-center space-x-1.5"
          >
            <RefreshCw class="w-3.5 h-3.5" />
            <span>Regenerate Schedule</span>
          </button>
        {:else}
          <div class="p-3 rounded-xl bg-track-proverbs/10 border border-track-proverbs/30 text-xs space-y-2">
            <p class="text-track-proverbs font-semibold">
              Regenerating will recalculate daily chapter allocations. Existing completion history will be preserved.
            </p>
            <div class="flex space-x-2">
              <button
                on:click={handleRegeneratePlan}
                class="px-3 py-1.5 rounded-md bg-track-proverbs text-white font-medium"
              >
                Confirm Regenerate
              </button>
              <button
                on:click={() => (showRegenerateConfirm = false)}
                class="px-3 py-1.5 rounded-md bg-mutedSurface-light dark:bg-mutedSurface-dark text-txt-primaryLight dark:text-txt-primaryDark"
              >
                Cancel
              </button>
            </div>
          </div>
        {/if}
      </div>
    </div>

    <!-- Section 2: Bible & Translation -->
    <div class="p-5 rounded-2xl bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark shadow-sm space-y-4">
      <h2 class="font-serif font-bold text-lg text-txt-primaryLight dark:text-txt-primaryDark">
        Bible Translation & YouVersion
      </h2>

      <div class="text-xs space-y-3">
        <div>
          <label class="block text-txt-secondaryLight dark:text-txt-secondaryDark font-medium mb-1">
            Default Translation
          </label>
          <input
            type="text"
            readonly
            value="English Standard Version (ESV) — YouVersion ID 59"
            class="w-full p-2.5 rounded-lg bg-canvas-light dark:bg-canvas-dark border border-border-light dark:border-border-dark text-txt-primaryLight dark:text-txt-primaryDark font-mono"
          />
        </div>

        <div>
          <label class="block text-txt-secondaryLight dark:text-txt-secondaryDark font-medium mb-1">
            Mobile Deep Link Status
          </label>
          <p class="text-txt-secondaryLight dark:text-txt-secondaryDark">
            Active (`youversion://bible?reference=...&version=59` with web URL fallback).
          </p>
        </div>
      </div>
    </div>

    <!-- Section 3: Data & Storage Mode -->
    <div class="p-5 rounded-2xl bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark shadow-sm space-y-4">
      <h2 class="font-serif font-bold text-lg text-txt-primaryLight dark:text-txt-primaryDark flex items-center space-x-2">
        <Database class="w-4 h-4 text-track-ot" />
        <span>Data & Persistence</span>
      </h2>

      <div class="p-3.5 rounded-xl bg-canvas-light dark:bg-canvas-dark border border-border-light dark:border-border-dark text-xs space-y-2">
        <div class="flex items-center justify-between">
          <span class="font-semibold text-txt-primaryLight dark:text-txt-primaryDark">
            Active Data Mode
          </span>
          <span class="px-2.5 py-1 rounded-full bg-track-success/10 text-track-success font-medium">
            Local Storage / IndexedDB Mode Active
          </span>
        </div>
        <p class="text-txt-secondaryLight dark:text-txt-secondaryDark">
          All reading completion progress, daily schedules, and study notes are saved securely in local persistent browser storage. Connect Supabase credentials in `.env` for multi-device sync.
        </p>
      </div>
    </div>
  </div>
</div>
