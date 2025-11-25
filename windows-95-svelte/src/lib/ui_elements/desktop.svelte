<svelte:head>
    <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap" rel="stylesheet">
</svelte:head>
<script lang="ts">
	import { onMount } from 'svelte';
	import Toolbar from './toolbar.svelte';
	import DesktopShortcut from './desktop-shortcut.svelte';
	import WindowManager from './window-manager.svelte';
    import PortfolioPage from '../pages/portfolio_page.svelte';
    import Blog from '../pages/blog.svelte';
    import BlogPost from '../pages/blog-post.svelte';
    import Clippy from './clippy/clippy.svelte';
    import ClippyChat from './clippy/clippy-chat.svelte';
	import Scanlines from './scanlines.svelte';
	import { base } from '$app/paths';
	import type { BlogPost as BlogPostType } from '$lib/data/blog';

    interface WindowState {
        id: string;
        title: string;
        isOpen: boolean;
        isMinimized: boolean;
        x: number;
        y: number;
        width: number;
        height: number;
        zIndex: number;
        iconUrl?: string;
        position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
        component?: any;
        props?: Record<string, any>;
    }

    interface WindowConfig {
        title: string;
        iconUrl: string;
        x: number;
        y: number;
        width: number;
        height: number;
        component: any;
        position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
    }

    // Mobile detection
    let isMobile = $state(false);
    let screenWidth = $state(typeof window !== 'undefined' ? window.innerWidth : 0);

    function updateScreenSize() {
        if (typeof window !== 'undefined') {
            screenWidth = window.innerWidth;
            isMobile = screenWidth < 768;
        }
    }

    // Z-index management
    let nextZIndex = $state(1000);
    let selectedBlogPost = $state<BlogPostType | null>(null);

    function getNextZIndex(): number {
        return ++nextZIndex;
    }

    function handleOpenBlogPost(post: BlogPostType) {
        selectedBlogPost = post;
        // Update blog-post window title and open it
        if (windowStates['blog-post']) {
            windowStates['blog-post'].title = post.title;
            windowStates['blog-post'].props = { post, onBack: handleBackToBlog };
            openWindow('blog-post');
            // Bring to front with a delay to ensure state updates and render first
            setTimeout(() => {
                bringToFront('blog-post');
            }, 0);
        }
    }

    function handleBackToBlog() {
        closeWindow('blog-post');
        selectedBlogPost = null;
        // Bring blog window to front
        bringToFront('blog');
    }

    // Window configuration dictionary
    const windowConfigs: Record<string, WindowConfig> = {
        'portfolio': {
            title: 'Portfolio',
            iconUrl: `${base}/icons/computer-4.png`,
            x: 50,
            y: 50,
            width: 800,
            height: 600,
            component: PortfolioPage,
            position: 'top-left'
        },
        'blog': {
            title: 'Blog',
            iconUrl: `${base}/icons/html2-5.png`,
            x: 100,
            y: 100,
            width: 700,
            height: 550,
            component: Blog,
            position: 'top-left'
        },
        'blog-post': {
            title: 'Blog Post',
            iconUrl: `${base}/icons/html2-5.png`,
            x: 150,
            y: 120,
            width: 650,
            height: 500,
            component: BlogPost,
            position: 'top-left'
        },
        'clippy-chat': {
            title: '💬 Chat with Clippy',
            iconUrl: `${base}/icons/html2-5.png`,
            x: 200,
            y: 150,
            width: 400,
            height: 500,
            component: ClippyChat,
            position: 'top-left'
        }
    };

    // Initialize window states from config
    function initializeWindowStates(): Record<string, WindowState> {
        const states: Record<string, WindowState> = {};

        for (const [id, config] of Object.entries(windowConfigs)) {
            states[id] = {
                id,
                title: config.title,
                isOpen: false,
                isMinimized: false,
                x: config.x,
                y: config.y,
                width: config.width,
                height: config.height,
                zIndex: 1000,
                iconUrl: config.iconUrl,
                position: config.position,
                component: config.component
            };
        }

        return states;
    }

    // Central window state management - initialized from config
    let windowStates = $state<Record<string, WindowState>>(initializeWindowStates());

    // Mount handler to open portfolio after everything is ready
    onMount(() => {
        // Initialize mobile detection
        updateScreenSize();
        window.addEventListener('resize', updateScreenSize);

        // Use a small delay to ensure all components are fully rendered
        setTimeout(() => {
            openWindow('portfolio');
        }, 50); // 50ms delay should be enough for rendering to complete

        return () => {
            window.removeEventListener('resize', updateScreenSize);
        };
    });

    // Computed property for open windows (for toolbar)
    let openWindows = $derived(
        Object.values(windowStates).filter(w => w.isOpen)
    );

    // Window management functions
    function openWindow(id: string) {
        if (windowStates[id]) {
            windowStates[id].isOpen = true;
            windowStates[id].isMinimized = false;
            windowStates[id].zIndex = getNextZIndex();
        }
    }

    function closeWindow(id: string) {
        if (windowStates[id]) {
            windowStates[id].isOpen = false;
            windowStates[id].isMinimized = false;
        }
    }

    function toggleWindowMinimized(id: string) {
        if (windowStates[id]) {
            if (windowStates[id].isMinimized) {
                // If minimized, restore it
                windowStates[id].isMinimized = false;
                windowStates[id].zIndex = getNextZIndex();
            } else {
                // If not minimized, minimize it
                windowStates[id].isMinimized = true;
            }
        }
    }

    function updateWindowPosition(id: string, x: number, y: number) {
        if (windowStates[id]) {
            windowStates[id].x = x;
            windowStates[id].y = y;
        }
    }

    function updateWindowSize(id: string, width: number, height: number) {
        if (windowStates[id]) {
            windowStates[id].width = width;
            windowStates[id].height = height;
        }
    }

    function bringToFront(id: string) {
        if (windowStates[id]) {
            windowStates[id].zIndex = getNextZIndex();
        }
    }

    // Generic window handler
    function handleWindowButton(id: string) {
        const state = windowStates[id];
        if (!state.isOpen) {
            openWindow(id);
        } else if (state.isMinimized) {
            toggleWindowMinimized(id);
        } else {
            bringToFront(id);
        }
    }

    // Clippy chat handler
    function handleClippyChatRequest() {
        handleWindowButton('clippy-chat');
    }

    // Get list of window IDs to render (excluding clippy-chat and blog-post as they're special)
    let renderableWindows = $derived(
        Object.keys(windowStates).filter(id => !['clippy-chat', 'blog-post'].includes(id))
    );
</script>

<Scanlines
  scanWidth={2}
  scanlineSpeed={30}
/>
<div class="desktop">
	<!-- Desktop Shortcuts - Generated from window config -->
	{#each renderableWindows as id, index}
		{@const state = windowStates[id]}
		<DesktopShortcut
			showButtonPosition={state.position || 'top-left'}
			showButtonText={state.title}
			buttonIndex={index}
			isVisible={!state.isOpen}
			imageUrl={state.iconUrl}
			onclick={() => handleWindowButton(id)}
		/>
	{/each}

	<!-- window management -->
	<div class="main-screen">
		<!-- Main desktop content -->
		<div class="desktop-content"></div>
	</div>

	<!-- Window Managers - Generated from window config -->
	{#each renderableWindows as id}
		{@const state = windowStates[id]}
		{@const config = windowConfigs[id]}
		<WindowManager
			windowState={state}
			{isMobile}
			onClose={() => closeWindow(id)}
			toggleMinimize={() => toggleWindowMinimized(id)}
			onPositionChange={(x, y) => updateWindowPosition(id, x, y)}
			onSizeChange={(w, h) => updateWindowSize(id, w, h)}
			onBringToFront={() => bringToFront(id)}
		>
			{#if id === 'blog'}
				<Blog onOpenPost={handleOpenBlogPost} />
			{:else if id === 'portfolio'}
				<PortfolioPage />
			{/if}
		</WindowManager>
	{/each}

	<!-- Clippy-specific window -->
	<WindowManager
		windowState={windowStates['clippy-chat']}
		{isMobile}
		onClose={() => closeWindow('clippy-chat')}
		toggleMinimize={() => toggleWindowMinimized('clippy-chat')}
		onPositionChange={(x, y) => updateWindowPosition('clippy-chat', x, y)}
		onSizeChange={(w, h) => updateWindowSize('clippy-chat', w, h)}
		onBringToFront={() => bringToFront('clippy-chat')}
	>
		<ClippyChat />
	</WindowManager>

    <Clippy onRequestChatWindow={handleClippyChatRequest} />

	<!-- Blog Post window - rendered last so it appears on top -->
	{#if selectedBlogPost}
		{@const blogPostState = windowStates['blog-post']}
		<WindowManager
			windowState={blogPostState}
			{isMobile}
			onClose={() => handleBackToBlog()}
			toggleMinimize={() => toggleWindowMinimized('blog-post')}
			onPositionChange={(x, y) => updateWindowPosition('blog-post', x, y)}
			onSizeChange={(w, h) => updateWindowSize('blog-post', w, h)}
			onBringToFront={() => bringToFront('blog-post')}
		>
			<BlogPost post={selectedBlogPost} onBack={handleBackToBlog} />
		</WindowManager>
	{/if}

	<!-- Toolbar at bottom -->
	<div class="toolbar">
		<Toolbar openWindows={openWindows} onWindowToggle={toggleWindowMinimized} />
	</div>
</div>

<style>
	.desktop {
		background-color: #438848;
		height: 100vh;
		display: flex;
		flex-direction: column;
		position: relative;
		flex-grow: 1;
		/* Establish stacking context */
		z-index: 0;
	}

	.main-screen {
		flex-grow: 1;
		position: relative;
		overflow: hidden;
		z-index: 1;
	}

	.desktop-content {
		padding: 20px;
		color: white;
		font-family: 'MS Sans Serif', sans-serif;
		font-size: 11px;
	}

	.toolbar {
		position: relative;
		z-index: 1000000;
	}

	/* Mobile styles */
	@media (max-width: 767px) {
		:global(.desktop-shortcut) {
			display: none;
		}
	}
</style>