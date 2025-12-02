<script lang="ts">
	import Home from './home.svelte';
	import About from './about.svelte';
	import Experience from './experience.svelte';
	import Projects from './projects.svelte';
	import Navigation from './navigation.svelte';

	// Props interface
	interface Props {
		showScanlines?: boolean;
		onToggleScanlines?: () => void;
	}

	let { showScanlines = true, onToggleScanlines }: Props = $props();

	// Navigation state
	type PageType = 'Home' | 'About' | 'Experience' | 'Projects';
	let currentPage: PageType = $state('Home');

	// Reactive state for window width
	let windowWidth = $state(typeof window !== 'undefined' ? window.innerWidth : 0);

	// Update window width on resize
	function handleResize() {
		windowWidth = window.innerWidth;
	}

	// Navigation function
	function navigateTo(page: PageType) {
		currentPage = page;
	}

	// Add event listener for window resize
	if (typeof window !== 'undefined') {
		window.addEventListener('resize', handleResize);
	}
</script>

<svelte:window on:resize={handleResize} />

<div class="app-content">
	<Navigation {currentPage} onNavigate={navigateTo}/> 
	<!-- TODO very small pages don't center well, and the heaadspin will overlap the navigation bar -->
	{#if currentPage === 'Home'}
		<Home {windowWidth} {showScanlines} {onToggleScanlines} />
	{:else if currentPage === 'About'}
		<About />
	{:else if currentPage === 'Experience'}
		<Experience />
	{:else if currentPage === 'Projects'}
		<Projects />
	{/if}
</div>

<style>
	.app-content {
		display: flex;
		flex-direction: column;
		height: 100%;
		font-family: 'MS Sans Serif', sans-serif;
	}
</style>