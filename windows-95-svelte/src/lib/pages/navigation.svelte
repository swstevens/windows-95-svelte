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
		gap: 8px;
		margin-bottom: 16px;
		padding: 8px;
		border-bottom: 3px solid #FF8C00;
	}

	.nav-link {
		background: #FF8C00;
		border: 2px solid #FF8C00;
		color: #FAF4E6;
		padding: 8px 16px;
		cursor: pointer;
		font-family: 'Space Mono', monospace;
		font-size: 11px;
		font-weight: 700;
		letter-spacing: 0.5px;
		min-width: 80px;
		text-align: center;
		transition: all 0.2s ease;
	}

	.nav-link:hover {
		background: #FAF4E6;
		color: #FF8C00;
		border-color: #FF8C00;
	}

	.nav-link:active {
		background: #4C545C;
		color: #FAF4E6;
		border-color: #4C545C;
	}

	.nav-link.active {
		background: #438848;
		color: #FAF4E6;
		border-color: #438848;
	}

	/* Mobile adjustments */
	@media (max-width: 480px) {
		.navigation {
			flex-direction: column;
			align-items: center;
		}

		.nav-link {
			margin: 2px 0;
			width: 120px;
		}
	}
</style>