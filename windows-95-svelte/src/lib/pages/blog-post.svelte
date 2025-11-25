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
</style>
