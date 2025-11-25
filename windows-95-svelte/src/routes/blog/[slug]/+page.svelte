<script lang="ts">
	import BlogPageWrapper from '$lib/components/blog-page-wrapper.svelte';
	import BlogHeader from '$lib/components/blog-header.svelte';
	import BlogContentViewer from '$lib/components/blog-content-viewer.svelte';
	import { goto } from '$app/navigation';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	function handleBack() {
		goto('/blog');
	}
</script>

<BlogPageWrapper>
	{#snippet children()}
		<div class="post-container">
			<BlogHeader title={data.post.title} date={data.post.date} showBackButton={true} onBack={handleBack} />
			<BlogContentViewer content={data.post.content} />
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
