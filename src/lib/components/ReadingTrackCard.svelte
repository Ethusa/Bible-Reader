<script ts>
  import type { GeneratedAssignment, TrackSlug } from '../readingPlan/types';
  import ReadingAssignmentRow from './ReadingAssignmentRow.svelte';
  import { CheckCircle2 } from 'lucide-svelte';

  export let title: string;
  export let trackSlug: TrackSlug;
  export let rotationNumber: number = 1;
  export let maxRotations: number = 4;
  export let accentColor: string = '#536B92';
  export let assignments: GeneratedAssignment[] = [];
  export let notes: Record<string, string> = {};
  export let rotationProgressPercent: number = 0;
  export let onToggleComplete: (id: string, completed: boolean) => void = () => {};
  export let onSaveNote: (refKey: string, note: string) => void = () => {};

  $: completedCount = assignments.filter((a) => a.completed).length;
  $: totalCount = assignments.length;
  $: isAllCompleted = totalCount > 0 && completedCount === totalCount;
</script>

<div
  class="relative overflow-hidden rounded-2xl bg-surface-light dark:bg-surface-dark border transition-all duration-200 shadow-sm hover:shadow-md {isAllCompleted
    ? 'border-track-success/40 bg-track-success/5 dark:bg-track-success/10'
    : 'border-border-light dark:border-border-dark'}"
>
  <!-- Accent Bar Top -->
  <div class="h-1.5 w-full" style="background-color: {accentColor}"></div>

  <div class="p-4 sm:p-6">
    <!-- Header -->
    <div class="flex items-center justify-between mb-3">
      <div>
        <span
          class="text-xs font-bold tracking-widest uppercase font-sans"
          style="color: {accentColor}"
        >
          {title}
        </span>
        <div class="flex items-center space-x-2 mt-0.5">
          <span class="text-xs text-txt-secondaryLight dark:text-txt-secondaryDark font-medium">
            Rotation {rotationNumber} of {maxRotations}
          </span>
        </div>
      </div>

      {#if isAllCompleted}
        <div class="flex items-center space-x-1 text-track-success text-xs font-semibold px-2.5 py-1 rounded-full bg-track-success/10">
          <CheckCircle2 class="w-4 h-4" />
          <span>Track Complete</span>
        </div>
      {:else if totalCount > 0}
        <span class="text-xs font-mono text-txt-secondaryLight dark:text-txt-secondaryDark">
          {completedCount}/{totalCount} done
        </span>
      {/if}
    </div>

    <!-- Assignments List -->
    <div class="space-y-1 my-2">
      {#each assignments as assignment (assignment.id || assignment.displayOrder)}
        <ReadingAssignmentRow
          assignmentId={assignment.id || ''}
          bookCode={assignment.bookCode}
          chapter={assignment.chapter}
          completed={assignment.completed || false}
          accentColor={accentColor}
          noteText={notes[`${assignment.bookCode}.${assignment.chapter}`] || ''}
          {onToggleComplete}
          {onSaveNote}
        />
      {/each}
      {#if assignments.length === 0}
        <p class="text-xs text-txt-secondaryLight dark:text-txt-secondaryDark italic py-2">
          No reading assigned for this track today.
        </p>
      {/if}
    </div>

    <!-- Progress Footer -->
    <div class="mt-4 pt-3 border-t border-border-light/60 dark:border-border-dark/60 flex items-center justify-between">
      <div class="w-full bg-mutedSurface-light dark:bg-mutedSurface-dark h-1.5 rounded-full overflow-hidden mr-3">
        <div
          class="h-full rounded-full transition-all duration-300"
          style="width: {rotationProgressPercent}%; background-color: {accentColor}"
        ></div>
      </div>
      <span class="text-xs font-mono text-txt-secondaryLight dark:text-txt-secondaryDark whitespace-nowrap">
        {rotationProgressPercent}% rotation
      </span>
    </div>
  </div>
</div>
