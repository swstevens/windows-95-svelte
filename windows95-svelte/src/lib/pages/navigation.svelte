<script lang="ts">
	// Props interface
	interface Props {
		currentPage: 'Home' | 'About' | 'Experience' | 'Projects';
		onNavigate: (page: 'Home' | 'About' | 'Experience' | 'Projects') => void;
	}

	let { currentPage, onNavigate }: Props = $props();
</script>

<div class="navigation">
	<button
		class="nav-link {currentPage === 'Home' ? 'active' : ''}"
		onclick={() => onNavigate('Home')}>Home</button
	>
	<button
		class="nav-link {currentPage === 'About' ? 'active' : ''}"
		onclick={() => onNavigate('About')}>About</button
	>
	<button
		class="nav-link {currentPage === 'Experience' ? 'active' : ''}"
		onclick={() => onNavigate('Experience')}>Experience</button
	>
	<button
		class="nav-link {currentPage === 'Projects' ? 'active' : ''}"
		onclick={() => onNavigate('Projects')}>Projects</button
	>
</div>

<style>
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