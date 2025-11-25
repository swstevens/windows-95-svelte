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
		--bg: #FAF4E6;
		--accent: #FF8C00;
		--primary: #4C545C;
		--secondary: #438848;

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
