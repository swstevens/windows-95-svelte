<script lang="ts">
	import Home from './home.svelte';
	import About from './about.svelte';
	import Experience from './experience.svelte';
	import Projects from './projects.svelte';
	import Navigation from './navigation.svelte';

	// Props interface
	interface Props {
		// Add any props you might need
	}

	let {}: Props = $props();

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
	{#if currentPage === 'Home'}
		<Navigation {currentPage} onNavigate={navigateTo} />
		<Home {windowWidth} />
	{:else if currentPage === 'About'}
		<Navigation {currentPage} onNavigate={navigateTo} />
		<About />
	{:else if currentPage === 'Experience'}
		<Navigation {currentPage} onNavigate={navigateTo} />
		<Experience />
	{:else if currentPage === 'Projects'}
		<Navigation {currentPage} onNavigate={navigateTo} />
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