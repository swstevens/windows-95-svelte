<script lang="ts">
	import BlogPageWrapper from '$lib/components/blog-page-wrapper.svelte';
	import { getBlogPosts } from '$lib/data/blog';
	import type { BlogPost } from '$lib/data/blog';
	import {
		getVisitorCount,
		getGuestbookEntries as fetchGuestbookEntries,
		addGuestbookEntry as addEntry
	} from '$lib/api-client';
	import type { GuestbookEntry } from '$lib/api-client';
	import { goto } from '$app/navigation';

	let visitorCount = $state(1337);
	let posts = $state<BlogPost[]>([]);
	let guestbookEntries = $state<GuestbookEntry[]>([]);

	let newGuestName = $state('');
	let newGuestMessage = $state('');
	let isSubmitting = $state(false);

	$effect(() => {
		// Load posts on component mount
		posts = getBlogPosts();

		// Load Supabase data
		loadData();
	});

	async function loadData() {
		const [count, entries] = await Promise.all([getVisitorCount(), fetchGuestbookEntries()]);
		visitorCount = count;
		guestbookEntries = entries;
	}

	async function addGuestbookEntry() {
		if (newGuestName.trim() && newGuestMessage.trim() && !isSubmitting) {
			isSubmitting = true;
			const newEntry = await addEntry(newGuestName, newGuestMessage);
			if (newEntry) {
				guestbookEntries = [newEntry, ...guestbookEntries];
				newGuestName = '';
				newGuestMessage = '';
			}
			isSubmitting = false;
		}
	}

	function handlePostClick(post: BlogPost) {
		goto(`/blog/${post.slug}`);
	}
</script>

<BlogPageWrapper>
	{#snippet children()}
		<div class="page-content">
			<!-- Header -->
			<div class="site-header">
				<div class="construction">UNDER CONSTRUCTION</div>
				<h2 class="site-title">MY BLOG</h2>
				<div class="tagline">Welcome / Thanks for visiting / Sign my guestbook</div>
				<div class="visitor-counter">
					Visitor <span class="counter">{visitorCount.toString().padStart(6, '0')}</span>
				</div>
			</div>

			<!-- Posts Section -->
			<div class="section">
				<div class="section-title">Newest Posts</div>
				{#each posts as post (post.id)}
					<button class="post-card" onclick={() => handlePostClick(post)}>
						<div class="post-title">{post.title}</div>
						<div class="post-date">
							{new Date(post.date).toLocaleDateString('en-US', {
								year: 'numeric',
								month: 'short',
								day: 'numeric'
							})}
						</div>
						<p class="post-excerpt">{post.excerpt}</p>
					</button>
				{/each}
			</div>

			<!-- Guestbook Section -->
			<div class="section guestbook">
				<div class="section-title">Guestbook</div>
				<div class="guestbook-form">
					<input
						type="text"
						placeholder="Your Name"
						bind:value={newGuestName}
						class="guest-input"
					/>
					<input
						type="text"
						placeholder="Leave a message"
						bind:value={newGuestMessage}
						class="guest-input"
					/>
					<button onclick={addGuestbookEntry} class="sign-btn">Sign</button>
				</div>
				<div class="guestbook-entries">
					{#each guestbookEntries as entry}
						<div class="guest-entry">
							<span class="guest-name">{entry.name}</span>
							<span class="guest-date">{entry.date}</span>
							<span class="guest-msg">{entry.message}</span>
						</div>
					{/each}
				</div>
			</div>

			<!-- Footer -->
			<div class="footer">
				<div class="badges">
					<span class="badge">Made with care</span>
					<span class="badge">Est. 2025</span>
				</div>
				<div class="webring">
					Prev / <span class="ring-name">RetroWeb Ring</span> / Next
				</div>
			</div>
		</div>
	{/snippet}
</BlogPageWrapper>

<style>
	.page-content {
		flex: 1;
		overflow-y: auto;
		padding: 16px;
	}

	.site-header {
		text-align: center;
		border-bottom: 3px solid var(--accent);
		padding-bottom: 16px;
		margin-bottom: 20px;
	}

	.construction {
		background: var(--accent);
		color: var(--bg);
		padding: 6px 20px;
		font-family: 'Space Mono', monospace;
		font-weight: 700;
		font-size: 10px;
		letter-spacing: 2px;
		display: inline-block;
		margin-bottom: 12px;
		border: 2px solid var(--accent);
	}

	.site-title {
		font-family: 'Space Mono', monospace;
		font-size: 28px;
		font-weight: 700;
		margin: 12px 0;
		letter-spacing: 2px;
		color: var(--primary);
	}

	.tagline {
		font-size: 11px;
		color: var(--secondary);
		letter-spacing: 0.5px;
		margin-top: 8px;
		font-weight: 600;
	}

	.visitor-counter {
		margin-top: 14px;
		font-size: 11px;
		color: var(--primary);
		letter-spacing: 0.5px;
	}

	.counter {
		background: var(--primary);
		color: var(--bg);
		padding: 4px 10px;
		font-family: 'Space Mono', monospace;
		font-weight: 700;
		border: 2px solid var(--primary);
	}

	.section {
		background: transparent;
		border: 2px solid var(--secondary);
		padding: 16px;
		margin-bottom: 20px;
	}

	.section-title {
		font-family: 'Space Mono', monospace;
		color: var(--primary);
		font-size: 12px;
		font-weight: 700;
		letter-spacing: 1px;
		text-transform: uppercase;
		border-bottom: 2px solid var(--accent);
		padding-bottom: 8px;
		margin-bottom: 14px;
	}

	.post-card {
		all: unset;
		display: block;
		background: transparent;
		border-left: 4px solid var(--secondary);
		padding: 10px 14px;
		margin-bottom: 14px;
		cursor: pointer;
		transition: all 0.2s ease;
		text-align: left;
	}

	.post-card:hover {
		background: rgba(255, 140, 0, 0.1);
		border-left-color: var(--accent);
		border-left-width: 6px;
		padding-left: 12px;
	}

	.post-card:active {
		background: rgba(67, 136, 72, 0.15);
	}

	.post-title {
		font-family: 'Space Mono', monospace;
		color: var(--primary);
		font-size: 13px;
		font-weight: 700;
		letter-spacing: 0.5px;
	}

	.post-card:hover .post-title {
		color: var(--accent);
	}

	.post-date {
		color: var(--secondary);
		font-size: 10px;
		margin: 6px 0;
		letter-spacing: 0.5px;
		font-weight: 600;
	}

	.post-excerpt {
		color: var(--primary);
		font-size: 11px;
		line-height: 1.6;
		margin: 0;
	}

	.guestbook-form {
		display: flex;
		gap: 8px;
		margin-bottom: 14px;
		flex-wrap: wrap;
	}

	.guest-input {
		flex: 1;
		min-width: 120px;
		padding: 8px 10px;
		background: var(--bg);
		border: 2px solid var(--secondary);
		color: var(--primary);
		font-family: 'Space Mono', monospace;
		font-size: 11px;
	}

	.guest-input:focus {
		outline: none;
		border-color: var(--accent);
	}

	.guest-input::placeholder {
		color: var(--secondary);
		opacity: 0.6;
	}

	.sign-btn {
		padding: 8px 20px;
		background: var(--accent);
		border: 2px solid var(--accent);
		color: var(--bg);
		cursor: pointer;
		font-family: 'Space Mono', monospace;
		font-size: 10px;
		font-weight: 700;
		letter-spacing: 0.5px;
		text-transform: uppercase;
		transition: all 0.2s ease;
	}

	.sign-btn:hover {
		background: var(--bg);
		color: var(--accent);
	}

	.sign-btn:active {
		background: var(--secondary);
		border-color: var(--secondary);
		color: var(--bg);
	}

	.guestbook-entries {
		max-height: 120px;
		overflow-y: auto;
	}

	.guest-entry {
		font-size: 11px;
		padding: 8px 0;
		border-bottom: 1px solid var(--secondary);
		color: var(--primary);
		display: flex;
		gap: 10px;
		align-items: baseline;
	}

	.guest-name {
		color: var(--accent);
		font-weight: 700;
	}

	.guest-date {
		color: var(--secondary);
		font-size: 10px;
		font-weight: 600;
	}

	.guest-msg {
		color: var(--primary);
	}

	.footer {
		text-align: center;
		border-top: 3px solid var(--accent);
		padding-top: 14px;
		margin-top: 20px;
	}

	.badges {
		display: flex;
		justify-content: center;
		gap: 12px;
		flex-wrap: wrap;
		margin-bottom: 10px;
	}

	.badge {
		background: var(--secondary);
		padding: 6px 14px;
		font-size: 10px;
		color: var(--bg);
		letter-spacing: 0.5px;
		border: 2px solid var(--secondary);
		font-weight: 600;
	}

	.webring {
		font-size: 11px;
		color: var(--secondary);
		letter-spacing: 0.5px;
	}

	.ring-name {
		color: var(--accent);
		font-weight: 700;
	}
</style>
