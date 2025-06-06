<svelte:head>
    <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap" rel="stylesheet">
</svelte:head>
<script lang="ts">
	import { onMount } from 'svelte';
	import Toolbar from './toolbar.svelte';
	import DesktopShortcut from './desktop-shortcut.svelte'; // Updated import
	import WindowManager from './window-manager.svelte';
    import PortfolioPage from '../pages/portfolio_page.svelte';
    import Clippy from './clippy/clippy.svelte';
    import ClippyChat from './clippy/clippy-chat.svelte';
	import Scanlines from './scanlines.svelte';
	import { base } from '$app/paths';
    import window from '$lib/window.svelte';    

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
        iconUrl?: string; // Added icon URL property
    }
    
    // Z-index management
    let nextZIndex = $state(1000);
    
    function getNextZIndex(): number {
        return ++nextZIndex;
    }
    
    // Add mounted state
    let isMounted = $state(false);
    
    // Central window state management
    let windowStates = $state<Record<string, WindowState>>({
        'portfolio': {
            id: 'portfolio',
            title: 'Portfolio',
            isOpen: false, // Changed to false initially
            isMinimized: false,
            x: 50,
            y: 50,
            width: 800,
            height: 600,
            zIndex: 1005,
            iconUrl: `${base}/icons/computer-4.png` // Add your icon paths
        },
        // 'tools-window': {
        //     id: 'tools-window',
        //     title: 'Home',
        //     isOpen: false,
        //     isMinimized: false,
        //     x: 80,
        //     y: 80,
        //     width: 800,
        //     height: 600,
        //     zIndex: 1001,
        //     iconUrl: `${base}/icons/directory_closed_cool-3.png`
        // },
        'clippy-chat': {
            id: 'clippy-chat',
            title: '💬 Chat with Clippy',
            isOpen: false,
            isMinimized: false,
            x: 200,
            y: 150,
            width: 400,
            height: 500,
            zIndex: 1002,
            iconUrl: `${base}/icons/html2-5.png`
        }
    });

    // Mount handler to open portfolio after everything is ready
    onMount(() => {
        // Use a small delay to ensure all components are fully rendered
        setTimeout(() => {
            isMounted = true;
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

    // Button click handlers
    function handleDebugPanelButton() {
        const state = windowStates['portfolio'];
        if (!state.isOpen) {
            openWindow('portfolio');
        } else if (state.isMinimized) {
            toggleWindowMinimized('portfolio');
        } else {
            bringToFront('portfolio');
        }
    }

    function handleToolsButton() {
        const state = windowStates['tools-window'];
        if (!state.isOpen) {
            openWindow('tools-window');
        } else if (state.isMinimized) {
            toggleWindowMinimized('tools-window');
        } else {
            bringToFront('tools-window');
        }
    }

    // Clippy chat handler
    function handleClippyChatRequest() {
        const state = windowStates['clippy-chat'];
        if (!state.isOpen) {
            openWindow('clippy-chat');
        } else if (state.isMinimized) {
            toggleWindowMinimized('clippy-chat');
        } else {
            bringToFront('clippy-chat');
        }
    }
</script>

<Scanlines 
  scanWidth={2} 
  scanlineSpeed={30}
/>
<div class="desktop">
	<!-- Desktop Shortcuts -->
	<DesktopShortcut
		showButtonPosition="top-left"
		showButtonText="Portfolio"
		buttonIndex={0}
		isVisible={!windowStates['portfolio'].isOpen}
		imageUrl={windowStates['portfolio'].iconUrl}
		onclick={handleDebugPanelButton}
	/>

	<!-- <DesktopShortcut
		showButtonPosition="top-left"
		showButtonText="Home"
		buttonIndex={1}
		isVisible={!windowStates['tools-window'].isOpen}
		imageUrl={windowStates['tools-window'].iconUrl}
		onclick={handleToolsButton}
	/> -->

	<!-- window management -->
	<div class="main-screen">
		<!-- Main desktop content -->
		<div class="desktop-content"></div>
	</div>

	<!-- Window Managers -->
	<WindowManager
		windowState={windowStates['portfolio']}
		onClose={() => closeWindow('portfolio')}
		toggleMinimize={() => toggleWindowMinimized('portfolio')}
		onPositionChange={(x, y) => updateWindowPosition('portfolio', x, y)}
		onSizeChange={(w, h) => updateWindowSize('portfolio', w, h)}
		onBringToFront={() => bringToFront('portfolio')}
	>
		<PortfolioPage />
	</WindowManager>

	<!-- <WindowManager
		windowState={windowStates['tools-window']}
		onClose={() => closeWindow('tools-window')}
		toggleMinimize={() => toggleWindowMinimized('tools-window')}
		onPositionChange={(x, y) => updateWindowPosition('tools-window', x, y)}
		onSizeChange={(w, h) => updateWindowSize('tools-window', w, h)}
		onBringToFront={() => bringToFront('tools-window')}
	>
		<PortfolioPage />
	</WindowManager> -->

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

	.minimized {
		pointer-events: none;
		opacity: 0;
	}
</style>