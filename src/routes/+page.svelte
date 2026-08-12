<script ts>
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';

  onMount(() => {
    goto('/today', { replaceState: true });
  });
</script>

<div class="py-12 text-center">
  <p class="text-xs text-txt-secondaryLight dark:text-txt-secondaryDark">Loading Today's Reading...</p>
</div>
