<script lang="ts">
	import BlogPageWrapper from '$lib/components/blog-page-wrapper.svelte';
	import { getBlogPosts } from '$lib/data/blog';
	import type { BlogPost } from '$lib/data/blog';

	interface Props {
		windowWidth?: number;
		onOpenPost?: (post: BlogPost) => void;
	}

	let { windowWidth = 800, onOpenPost }: Props = $props();

	let visitorCount = $state(Math.floor(Math.random() * 9000) + 1000);
	let posts = $state<BlogPost[]>([]);
	let guestbookEntries = $state([
		{ name: 'CoolDude99', message: 'Awesome site!!', date: 'Nov 18' },
		{ name: 'WebSurfer2000', message: 'Love the retro vibes', date: 'Nov 12' }
	]);

	let newGuestName = $state('');
	let newGuestMessage = $state('');

	$effect(() => {
		// Load posts on component mount
		posts = getBlogPosts();
	});

	function addGuestbookEntry() {
		if (newGuestName.trim() && newGuestMessage.trim()) {
			guestbookEntries = [
				{ name: newGuestName, message: newGuestMessage, date: 'Today' },
				...guestbookEntries
			];
			newGuestName = '';
			newGuestMessage = '';
		}
	}

	function handlePostClick(post: BlogPost) {
		onOpenPost?.(post);
	}

	$effect(() => {
		const interval = setInterval(() => {
			visitorCount += Math.floor(Math.random() * 3);
		}, 8000);
		return () => clearInterval(interval);
	});
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
					<button class="post-card" on:click={() => handlePostClick(post)}>
						<div class="post-title">{post.title}</div>
						<div class="post-date">{new Date(post.date).toLocaleDateString('en-US', {
							year: 'numeric',
							month: 'short',
							day: 'numeric'
						})}</div>
						<p class="post-excerpt">{post.excerpt}</p>
					</button>
				{/each}
			</div>

			<!-- Guestbook Section -->
			<div class="section guestbook">
				<div class="section-title">Guestbook</div>
				<div class="guestbook-form">
					<input type="text" placeholder="Your Name" bind:value={newGuestName} class="guest-input" />
					<input type="text" placeholder="Leave a message" bind:value={newGuestMessage} class="guest-input" />
					<button on:click={addGuestbookEntry} class="sign-btn">Sign</button>
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
		padding: 12px;
	}

	.site-header {
		text-align: center;
		border-bottom: 2px solid var(--primary);
		padding-bottom: 16px;
		margin-bottom: 16px;
	}

	.construction {
		background: var(--accent);
		color: var(--bg);
		padding: 4px 16px;
		font-family: 'Orbitron', sans-serif;
		font-weight: 700;
		font-size: 9px;
		letter-spacing: 2px;
		display: inline-block;
		margin-bottom: 12px;
	}

	.site-title {
		font-family: 'Orbitron', sans-serif;
		font-size: 22px;
		font-weight: 700;
		margin: 8px 0;
		letter-spacing: 4px;
		color: var(--primary);
	}

	.tagline {
		font-size: 10px;
		color: var(--muted);
		letter-spacing: 1px;
		margin-top: 8px;
	}

	.visitor-counter {
		margin-top: 12px;
		font-size: 10px;
		color: var(--primary);
		letter-spacing: 1px;
	}

	.counter {
		background: var(--primary);
		color: var(--accent);
		padding: 3px 8px;
		font-family: 'Space Mono', monospace;
		font-weight: 700;
	}

	.section {
		background: var(--primary);
		border: none;
		padding: 12px;
		margin-bottom: 16px;
	}

	.section-title {
		font-family: 'Orbitron', sans-serif;
		color: var(--accent);
		font-size: 11px;
		font-weight: 700;
		letter-spacing: 2px;
		text-transform: uppercase;
		border-bottom: 1px solid var(--muted);
		padding-bottom: 8px;
		margin-bottom: 12px;
	}

	.post-card {
		all: unset;
		display: block;
		background: transparent;
		border-left: 3px solid var(--accent);
		padding: 8px 12px;
		margin-bottom: 12px;
		cursor: pointer;
		transition: all 0.2s ease;
		text-align: left;
	}

	.post-card:hover {
		background: rgba(29, 99, 69, 0.1);
		border-left-width: 5px;
		padding-left: 10px;
	}

	.post-card:active {
		background: rgba(29, 99, 69, 0.2);
	}

	.post-title {
		font-family: 'Orbitron', sans-serif;
		color: var(--bg);
		font-size: 11px;
		font-weight: 700;
		letter-spacing: 1px;
	}

	.post-card:hover .post-title {
		color: var(--accent);
	}

	.post-date {
		color: var(--muted);
		font-size: 9px;
		margin: 6px 0;
		letter-spacing: 1px;
	}

	.post-excerpt {
		color: var(--bg);
		font-size: 10px;
		line-height: 1.6;
		margin: 0;
	}

	.guestbook-form {
		display: flex;
		gap: 6px;
		margin-bottom: 12px;
		flex-wrap: wrap;
	}

	.guest-input {
		flex: 1;
		min-width: 100px;
		padding: 6px 8px;
		background: var(--bg);
		border: 1px solid var(--muted);
		color: var(--primary);
		font-family: 'Space Mono', monospace;
		font-size: 10px;
	}

	.guest-input::placeholder {
		color: var(--muted);
	}

	.sign-btn {
		padding: 6px 16px;
		background: var(--accent);
		border: none;
		color: var(--bg);
		cursor: pointer;
		font-family: 'Orbitron', sans-serif;
		font-size: 9px;
		font-weight: 700;
		letter-spacing: 1px;
		text-transform: uppercase;
	}

	.sign-btn:hover {
		background: var(--muted);
	}

	.guestbook-entries {
		max-height: 100px;
		overflow-y: auto;
	}

	.guest-entry {
		font-size: 10px;
		padding: 6px 0;
		border-bottom: 1px solid var(--muted);
		color: var(--bg);
		display: flex;
		gap: 8px;
		align-items: baseline;
	}

	.guest-name {
		color: var(--accent);
		font-weight: 700;
	}

	.guest-date {
		color: var(--muted);
		font-size: 9px;
	}

	.guest-msg {
		color: var(--bg);
	}

	.footer {
		text-align: center;
		border-top: 2px solid var(--primary);
		padding-top: 12px;
		margin-top: 12px;
	}

	.badges {
		display: flex;
		justify-content: center;
		gap: 12px;
		flex-wrap: wrap;
		margin-bottom: 8px;
	}

	.badge {
		background: var(--primary);
		padding: 4px 12px;
		font-size: 9px;
		color: var(--bg);
		letter-spacing: 1px;
	}

	.webring {
		font-size: 10px;
		color: var(--muted);
		letter-spacing: 1px;
	}

	.ring-name {
		color: var(--accent);
		font-weight: 700;
	}
</style>
