<script lang="ts">
	import BlogPageWrapper from '$lib/components/blog-page-wrapper.svelte';
	import BlogHeader from '$lib/components/blog-header.svelte';
	import BlogContentViewer from '$lib/components/blog-content-viewer.svelte';
	import type { BlogPost } from '$lib/data/blog';

	interface Props {
		post: BlogPost;
		onBack?: () => void;
	}

	let { post, onBack }: Props = $props();
</script>

<BlogPageWrapper>
	{#snippet children()}
		<div class="post-container">
			<BlogHeader title={post.title} date={post.date} showBackButton={true} {onBack} />
			{#if post.pdfUrl}
				<a href={post.pdfUrl} download class="pdf-download-link">Download PDF</a>
			{/if}
			<BlogContentViewer content={post.content} />
		</div>
	{/snippet}
</BlogPageWrapper>

<style>
	.post-container {
		display: flex;
		flex-direction: column;
		height: 100%;
		padding: 16px;
	}

	.pdf-download-link {
		display: inline-block;
		align-self: flex-start;
		margin-bottom: 16px;
		padding: 8px 16px;
		background: var(--accent);
		color: var(--bg);
		font-family: 'Space Mono', monospace;
		font-size: 11px;
		font-weight: 700;
		letter-spacing: 0.5px;
		text-decoration: none;
		border: 2px solid var(--accent);
		transition: all 0.2s ease;
	}

	.pdf-download-link:hover {
		background: var(--bg);
		color: var(--accent);
	}
</style>
