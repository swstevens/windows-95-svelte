<script lang="ts">
	interface Props {
		title: string;
		date?: string;
		showBackButton?: boolean;
		onBack?: () => void;
	}

	let { title, date, showBackButton = false, onBack }: Props = $props();
</script>

<div class="header">
	{#if showBackButton}
		<button class="back-button" onclick={onBack} title="Back">← Back</button>
	{/if}
	<h1 class="title">{title}</h1>
	{#if date}
		<div class="meta">
			<span class="date">{new Date(date).toLocaleDateString('en-US', {
				year: 'numeric',
				month: 'long',
				day: 'numeric'
			})}</span>
		</div>
	{/if}
</div>

<style>
	.header {
		border-bottom: 3px solid var(--accent);
		padding-bottom: 16px;
		margin-bottom: 24px;
	}

	.back-button {
		all: unset;
		display: inline-block;
		margin-bottom: 12px;
		padding: 8px 16px;
		background: var(--accent);
		color: var(--bg);
		font-family: 'Space Mono', monospace;
		font-size: 11px;
		font-weight: 700;
		letter-spacing: 0.5px;
		cursor: pointer;
		transition: all 0.2s ease;
		border: 2px solid var(--accent);
	}

	.back-button:hover {
		background: var(--bg);
		color: var(--accent);
		border-color: var(--accent);
	}

	.back-button:active {
		background: var(--primary);
		color: var(--bg);
		border-color: var(--primary);
	}

	.title {
		font-family: 'Space Mono', monospace;
		font-size: 24px;
		font-weight: 700;
		margin: 0 0 12px 0;
		letter-spacing: 1px;
		color: var(--primary);
	}

	.meta {
		display: flex;
		gap: 12px;
		align-items: center;
		font-size: 11px;
	}

	.date {
		color: var(--secondary);
		letter-spacing: 0.5px;
		font-weight: 600;
	}
</style>
