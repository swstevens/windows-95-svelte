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
		font-size: 12px;
		line-height: 1.8;
		padding: 0;
		color: var(--primary);
	}

	:global(.content h2) {
		font-family: 'Space Mono', monospace;
		font-size: 16px;
		font-weight: 700;
		margin: 20px 0 10px 0;
		color: var(--primary);
		letter-spacing: 0.5px;
		border-bottom: 2px solid var(--accent);
		padding-bottom: 6px;
	}

	:global(.content h3) {
		font-family: 'Space Mono', monospace;
		font-size: 14px;
		font-weight: 700;
		margin: 16px 0 8px 0;
		color: var(--secondary);
		letter-spacing: 0.5px;
	}

	:global(.content p) {
		margin: 10px 0;
		color: var(--primary);
	}

	:global(.content a) {
		color: var(--secondary);
		text-decoration: underline;
		font-weight: 600;
	}

	:global(.content a:hover) {
		color: var(--accent);
	}

	:global(.content ul) {
		margin: 10px 0;
		padding-left: 24px;
	}

	:global(.content li) {
		margin: 6px 0;
		color: var(--primary);
	}

	:global(.content code) {
		background: var(--primary);
		color: var(--bg);
		padding: 3px 8px;
		font-family: 'Space Mono', monospace;
		font-size: 11px;
		border: 1px solid var(--primary);
	}

	:global(.content pre) {
		background: var(--primary);
		color: var(--bg);
		padding: 16px;
		overflow-x: auto;
		border-left: 4px solid var(--accent);
		font-size: 11px;
		line-height: 1.6;
		margin: 16px 0;
	}

	:global(.content pre code) {
		background: none;
		color: inherit;
		padding: 0;
		border: none;
	}
</style>
