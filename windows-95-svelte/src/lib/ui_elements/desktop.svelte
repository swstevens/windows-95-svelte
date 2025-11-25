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
    import Clippy from './clippy/clippy.svelte';
    import ClippyChat from './clippy/clippy-chat.svelte';
	import Scanlines from './scanlines.svelte';
	import { base } from '$app/paths';

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

    // Z-index management
    let nextZIndex = $state(1000);

    function getNextZIndex(): number {
        return ++nextZIndex;
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
        // Use a small delay to ensure all components are fully rendered
        setTimeout(() => {
            openWindow('portfolio');
        }, 50); // 50ms delay should be enough for rendering to complete
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

    // Get list of window IDs to render (excluding clippy-chat as it's special)
    let renderableWindows = $derived(
        Object.keys(windowStates).filter(id => id !== 'clippy-chat')
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
			onClose={() => closeWindow(id)}
			toggleMinimize={() => toggleWindowMinimized(id)}
			onPositionChange={(x, y) => updateWindowPosition(id, x, y)}
			onSizeChange={(w, h) => updateWindowSize(id, w, h)}
			onBringToFront={() => bringToFront(id)}
		>
			<svelte:component this={config.component} />
		</WindowManager>
	{/each}

	<!-- Clippy-specific window -->
	<WindowManager
		windowState={windowStates['clippy-chat']}
		onClose={() => closeWindow('clippy-chat')}
		toggleMinimize={() => toggleWindowMinimized('clippy-chat')}
		onPositionChange={(x, y) => updateWindowPosition('clippy-chat', x, y)}
		onSizeChange={(w, h) => updateWindowSize('clippy-chat', w, h)}
		onBringToFront={() => bringToFront('clippy-chat')}
	>
		<ClippyChat />
	</WindowManager>

    <Clippy onRequestChatWindow={handleClippyChatRequest} />

	<!-- Toolbar at bottom -->
	<div class="toolbar">
		<Toolbar openWindows={openWindows} onWindowToggle={toggleWindowMinimized} />
	</div>
</div>

<style>
	.desktop {
		background-color: #018281;
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
</style>