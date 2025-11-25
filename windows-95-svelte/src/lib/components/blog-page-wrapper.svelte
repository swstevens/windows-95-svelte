<script lang="ts">
	interface Props {
		children?: any;
	}

	let { children }: Props = $props();
</script>

<div class="page blog-page">
	{@render children?.()}
</div>

<style>
	.page {
		--bg: #E4D5C0;
		--accent: #1d6345;
		--primary: #c2754f;
		--muted: #1d6345;

		display: flex;
		flex-direction: column;
		height: 100%;
		background: var(--bg);
		color: var(--primary);
		font-family: 'Space Mono', monospace;
	}

	.blog-page {
		overflow-y: auto;
	}
</style>
