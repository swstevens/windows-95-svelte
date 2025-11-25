<script lang="ts">
	interface Props {
		content: string;
	}

	let { content }: Props = $props();
</script>

<div class="content">
	{@html content}
</div>

<style>
	.content {
		flex: 1;
		overflow-y: auto;
		font-size: 11px;
		line-height: 1.8;
		padding: 0;
	}

	:global(.content h2) {
		font-family: 'Orbitron', sans-serif;
		font-size: 14px;
		font-weight: 700;
		margin: 16px 0 8px 0;
		color: var(--primary);
		letter-spacing: 1px;
	}

	:global(.content h3) {
		font-family: 'Orbitron', sans-serif;
		font-size: 12px;
		font-weight: 700;
		margin: 12px 0 6px 0;
		color: var(--primary);
		letter-spacing: 1px;
	}

	:global(.content p) {
		margin: 8px 0;
	}

	:global(.content a) {
		color: var(--accent);
		text-decoration: underline;
	}

	:global(.content a:hover) {
		color: var(--primary);
	}

	:global(.content code) {
		background: var(--primary);
		color: var(--bg);
		padding: 2px 6px;
		border-radius: 2px;
		font-family: 'Space Mono', monospace;
		font-size: 10px;
	}

	:global(.content pre) {
		background: var(--primary);
		color: var(--bg);
		padding: 12px;
		overflow-x: auto;
		border-left: 3px solid var(--accent);
		font-size: 10px;
		line-height: 1.4;
	}

	:global(.content pre code) {
		background: none;
		color: inherit;
		padding: 0;
		border-radius: 0;
	}
</style>
