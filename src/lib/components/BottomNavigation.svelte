<script ts>
  import { page } from '$app/stores';
  import { Calendar, CheckSquare, Clock, LayoutDashboard, BookOpen, Settings } from 'lucide-svelte';

  $: currentPath = $page.url.pathname;

  const navItems = [
    { href: '/today', label: 'Today', icon: LayoutDashboard },
    { href: '/calendar', label: 'Calendar', icon: Calendar },
    { href: '/progress', label: 'Progress', icon: CheckSquare },
    { href: '/catch-up', label: 'Catch-Up', icon: Clock },
    { href: '/study/2026-08-12', label: 'Study', icon: BookOpen },
    { href: '/settings', label: 'Settings', icon: Settings }
  ];
</script>

<!-- Mobile & Tablet Bottom Navigation -->
<nav class="fixed bottom-0 left-0 right-0 z-40 bg-surface-light/95 dark:bg-surface-dark/95 backdrop-blur-md border-t border-border-light dark:border-border-dark px-2 py-1.5 shadow-lg max-w-4xl mx-auto">
  <div class="flex items-center justify-around">
    {#each navItems as item}
      {@const isActive = currentPath === item.href || (item.href === '/today' && currentPath === '/')}
      <a
        href={item.href}
        class="flex flex-col items-center py-1 px-2 rounded-xl transition-all duration-150 {isActive
          ? 'text-track-nt dark:text-track-nt font-semibold'
          : 'text-txt-secondaryLight dark:text-txt-secondaryDark hover:text-txt-primaryLight dark:hover:text-txt-primaryDark'}"
      >
        <svelte:component this={item.icon} class="w-5 h-5 mb-0.5 {isActive ? 'scale-110' : ''}" />
        <span class="text-[10px] tracking-tight">{item.label}</span>
      </a>
    {/each}
  </div>
</nav>
