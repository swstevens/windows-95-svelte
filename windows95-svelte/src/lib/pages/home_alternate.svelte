<script lang="ts">
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
		<div class="page home-page">
			<div class="image-section">
				<img src="/headspin-square-unscreen.gif" alt="my head" class="headspin" />
			</div>
			<div class="info-section">
				<h1 class={windowWidth <= 480 ? 'center-text' : ''}>SHEA STEVENS</h1>
				<div class="navigation">
					<button
						class="nav-link {currentPage === 'Home' as any ? 'active' : ''}"
						onclick={() => navigateTo('Home')}>Home</button
					>
					<button
						class="nav-link {currentPage === 'About' as any ? 'active' : ''}"
						onclick={() => navigateTo('About')}>About</button
					>
					<button
						class="nav-link {currentPage === 'Experience' as any ? 'active' : ''}"
						onclick={() => navigateTo('Experience')}>Experience</button
					>
					<button
						class="nav-link {currentPage === 'Projects' as any ? 'active' : ''}"
						onclick={() => navigateTo('Projects')}>Projects</button
					>
				</div>
			</div>
		</div>
	{:else if currentPage === 'About'}
		<div class="page about-page">
			<div class="navigation">
				<button
					class="nav-link {currentPage === 'Home' as any ? 'active' : ''}"
					onclick={() => navigateTo('Home')}>Home</button
				>
				<button
					class="nav-link {currentPage === 'About' as any ? 'active' : ''}"
					onclick={() => navigateTo('About')}>About</button
				>
				<button
					class="nav-link {currentPage === 'Experience' as any ? 'active' : ''}"
					onclick={() => navigateTo('Experience')}>Experience</button
				>
				<button
					class="nav-link {currentPage === 'Projects' as any ? 'active' : ''}"
					onclick={() => navigateTo('Projects')}>Projects</button
				>
			</div>
			<div class="page-content">
				<h2>About Me</h2>
				<p>
					This is the about page content. Add your personal information, background, interests, etc.
				</p>
				<p>
					You can add more content here about your background, skills, interests, and anything else
					you'd like to share.
				</p>
			</div>
		</div>
	{:else if currentPage === 'Experience'}
		<div class="page experience-page">
			<div class="navigation">
				<button
					class="nav-link {currentPage === 'Home' as any ? 'active' : ''}"
					onclick={() => navigateTo('Home')}>Home</button
				>
				<button
					class="nav-link {currentPage === 'About' as any ? 'active' : ''}"
					onclick={() => navigateTo('About')}>About</button
				>
				<button
					class="nav-link {currentPage === 'Experience' as any ? 'active' : ''}"
					onclick={() => navigateTo('Experience')}>Experience</button
				>
				<button
					class="nav-link {currentPage === 'Projects' as any ? 'active' : ''}"
					onclick={() => navigateTo('Projects')}>Projects</button
				>
			</div>
			<div class="page-content">
				<h2>Experience</h2>
				<div class="experience-item">
					<h3>Job Title - Company Name</h3>
					<p class="date">Start Date - End Date</p>
					<p>Description of your role and responsibilities...</p>
				</div>
				<div class="experience-item">
					<h3>Another Job Title - Another Company</h3>
					<p class="date">Start Date - End Date</p>
					<p>Description of your role and responsibilities...</p>
				</div>
			</div>
		</div>
	{:else if currentPage === 'Projects'}
		<div class="page projects-page">
			<div class="navigation">
				<button
					class="nav-link {currentPage === 'Home' as any ? 'active' : ''}"
					onclick={() => navigateTo('Home')}>Home</button
				>
				<button
					class="nav-link {currentPage === 'About' as any ? 'active' : ''}"
					onclick={() => navigateTo('About')}>About</button
				>
				<button
					class="nav-link {currentPage === 'Experience' as any ? 'active' : ''}"
					onclick={() => navigateTo('Experience')}>Experience</button
				>
				<button
					class="nav-link {currentPage === 'Projects' as any ? 'active' : ''}"
					onclick={() => navigateTo('Projects')}>Projects</button
				>
			</div>
			<div class="page-content">
				<h2>Projects</h2>
				<div class="project-item">
					<h3>Project Name 1</h3>
					<p>Description of your project, technologies used, and what you accomplished.</p>
				</div>
				<div class="project-item">
					<h3>Project Name 2</h3>
					<p>Description of another project, technologies used, and what you accomplished.</p>
				</div>
				<div class="project-item">
					<h3>Project Name 3</h3>
					<p>Description of another project, technologies used, and what you accomplished.</p>
				</div>
			</div>
		</div>
	{/if}
</div>

<style>
	.app-content {
		display: flex;
		flex-direction: column;
		height: 100%;
		font-family: 'MS Sans Serif', sans-serif;
	}

	.page {
		display: flex;
		flex-direction: column;
		height: 100%;
		padding: 8px;
	}

	.home-page {
		align-items: center;
		justify-content: center;
	}

	.image-section {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 20px;
	}

	.info-section {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-align: center;
	}

	.headspin {
		max-width: 120px;
		max-height: 120px;
		width: auto;
		height: auto;
	}

	.navigation {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 4px;
		margin-bottom: 16px;
		padding: 4px;
		border-bottom: 1px solid #808080;
	}

	.nav-link {
		background: #c0c0c0;
		border: 1px outset #c0c0c0;
		color: black;
		padding: 4px 8px;
		cursor: pointer;
		font-family: 'MS Sans Serif', sans-serif;
		font-size: 11px;
		min-width: 60px;
		text-align: center;
	}

	.nav-link:hover {
		background: #d4d0c8;
	}

	.nav-link:active {
		border: 1px inset #c0c0c0;
		background: #a0a0a0;
	}

	.nav-link.active {
		background: #a0a0a0;
		border: 1px inset #c0c0c0;
	}

	.page-content {
		flex: 1;
		overflow-y: auto;
		padding: 8px;
	}

	h1 {
		margin: 0 0 20px 0;
		color: #000;
		font-family: 'MS Sans Serif', sans-serif;
		font-size: 18px;
		font-weight: bold;
	}

	h2 {
		margin: 0 0 16px 0;
		color: #000;
		font-family: 'MS Sans Serif', sans-serif;
		font-size: 14px;
		font-weight: bold;
	}

	h3 {
		margin: 0 0 8px 0;
		color: #000;
		font-family: 'MS Sans Serif', sans-serif;
		font-size: 12px;
		font-weight: bold;
	}

	p {
		margin: 0 0 8px 0;
		font-size: 11px;
		line-height: 1.4;
	}

	.center-text {
		text-align: center;
	}

	.experience-item,
	.project-item {
		margin-bottom: 16px;
		padding-bottom: 12px;
		border-bottom: 1px solid #d0d0d0;
	}

	.experience-item:last-child,
	.project-item:last-child {
		border-bottom: none;
	}

	.date {
		font-style: italic;
		color: #606060;
	}

	/* Mobile adjustments */
	@media (max-width: 480px) {
		.navigation {
			flex-direction: column;
			align-items: center;
		}

		.nav-link {
			margin: 2px 0;
			width: 100px;
		}
	}
</style>
