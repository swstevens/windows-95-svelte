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
		border-bottom: 2px solid var(--primary);
		padding-bottom: 16px;
		margin-bottom: 24px;
	}

	.back-button {
		all: unset;
		display: inline-block;
		margin-bottom: 12px;
		padding: 6px 12px;
		background: var(--accent);
		color: var(--bg);
		font-family: 'Orbitron', sans-serif;
		font-size: 10px;
		font-weight: 700;
		letter-spacing: 1px;
		cursor: pointer;
		transition: all 0.2s ease;
		border-radius: 2px;
	}

	.back-button:hover {
		background: var(--primary);
		color: var(--bg);
	}

	.back-button:active {
		opacity: 0.8;
	}

	.title {
		font-family: 'Orbitron', sans-serif;
		font-size: 24px;
		font-weight: 700;
		margin: 0 0 12px 0;
		letter-spacing: 2px;
		color: var(--primary);
	}

	.meta {
		display: flex;
		gap: 12px;
		align-items: center;
		font-size: 11px;
	}

	.date {
		color: var(--muted);
		letter-spacing: 1px;
	}
</style>
