<script lang="ts">
	interface Props {
		content: string;
	}

	let { content }: Props = $props();
</script>

<div class="blog-content">
	{@html content}
</div>

<style>
	.blog-content {
		flex: 1;
		overflow-y: auto;
		font-size: 12px;
		line-height: 1.8;
		padding: 0;
		color: var(--primary);
	}

	:global(.blog-content h2) {
		font-family: 'Space Mono', monospace;
		font-size: 16px;
		font-weight: 700;
		margin: 20px 0 10px 0;
		color: var(--primary);
		letter-spacing: 0.5px;
		border-bottom: 2px solid var(--accent);
		padding-bottom: 6px;
	}

	:global(.blog-content h3) {
		font-family: 'Space Mono', monospace;
		font-size: 14px;
		font-weight: 700;
		margin: 16px 0 8px 0;
		color: var(--secondary);
		letter-spacing: 0.5px;
	}

	:global(.blog-content p) {
		margin: 10px 0;
		color: var(--primary);
	}

	:global(.blog-content a) {
		color: var(--secondary);
		text-decoration: underline;
		font-weight: 600;
	}

	:global(.blog-content a:hover) {
		color: var(--accent);
	}

	:global(.blog-content ul) {
		margin: 10px 0;
		padding-left: 24px;
	}

	:global(.blog-content li) {
		margin: 6px 0;
		color: var(--primary);
	}

	:global(.blog-content code) {
		background: var(--primary);
		color: var(--bg);
		padding: 3px 8px;
		font-family: 'Space Mono', monospace;
		font-size: 11px;
		border: 1px solid var(--primary);
	}

	:global(.blog-content pre) {
		background: var(--primary);
		color: var(--bg);
		padding: 16px;
		overflow-x: auto;
		border-left: 4px solid var(--accent);
		font-size: 11px;
		line-height: 1.6;
		margin: 16px 0;
	}

	:global(.blog-content pre code) {
		background: none;
		color: inherit;
		padding: 0;
		border: none;
	}

	:global(.blog-content img) {
		max-width: 100%;
		height: auto;
		display: block;
		margin: 16px auto;
		border: 2px solid var(--secondary);
	}

	:global(.blog-content .figure-caption) {
		margin: -8px 0 16px 0;
		font-size: 11px;
		font-style: italic;
		color: var(--secondary);
		text-align: center;
	}

	:global(.blog-content table) {
		display: block;
		overflow-x: auto;
		border-collapse: collapse;
		margin: 16px 0;
		font-size: 11px;
		white-space: nowrap;
	}

	:global(.blog-content th),
	:global(.blog-content td) {
		padding: 6px 10px;
		border: 1px solid var(--secondary);
		text-align: left;
	}

	:global(.blog-content th) {
		background: var(--primary);
		color: var(--bg);
		font-family: 'Space Mono', monospace;
		font-weight: 700;
	}

	:global(.blog-content tr:nth-child(even) td) {
		background: rgba(76, 84, 92, 0.08);
	}
</style>
