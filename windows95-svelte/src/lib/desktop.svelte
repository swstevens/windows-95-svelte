<script lang="ts">
	import { onMount } from 'svelte';
	import Placeholder from './placeholder.svelte';
	import Toolbar from './toolbar.svelte';
	import WindowButton from './window-button.svelte';
	import WindowManager from './window-manager.svelte';
	import Settings from './settings.svelte';
    import PortfolioPage from './pages/portfolio_page.svelte';
    import Clippy from './clippy.svelte';
	import Scanlines from './scanlines.svelte';
	
    const OBJECTS = {
		Portfolio: {
			key: 'About Me',
			icon: 'assets/myComputer.png',
			page: Placeholder,
			top: 12,
			left: 12
		},
		Doom: {
			key: 'Doom',
			icon: 'assets/doom.ico',
			page: Placeholder,
			top: 92,
			left: 12
		}
	};

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
    }
    
    // Z-index management
    let nextZIndex = $state(1000);
    
    function getNextZIndex(): number {
        return ++nextZIndex;
    }
    
    // Central window state management
    let windowStates = $state<Record<string, WindowState>>({
        'debug-panel': {
            id: 'debug-panel',
            title: 'Settings',
            isOpen: false,
            isMinimized: false,
            x: 50,
            y: 50,
            width: 800,
            height: 600,
            zIndex: 1000
        },
        'tools-window': {
            id: 'tools-window',
            title: 'Home',
            isOpen: false,
            isMinimized: false,
            x: 80,
            y: 80,
            width: 800,
            height: 600,
            zIndex: 1001
        }
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
            windowStates[id].zIndex = getNextZIndex(); // Use incremental z-index
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
                windowStates[id].zIndex = getNextZIndex(); // Bring to front
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
        const state = windowStates['debug-panel'];
        if (!state.isOpen) {
            openWindow('debug-panel');
        } else if (state.isMinimized) {
            toggleWindowMinimized('debug-panel');
        } else {
            bringToFront('debug-panel');
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
</script>

<Scanlines 
  scanWidth={2} 
  scanlineSpeed={30}
/>
<div class="desktop">
	<!-- shortcut icons -->
	<!-- {#each entries as [name,object]}
        <div class="item-{object.key}">
            <Placeholder/>
        </div>
    {/each} -->

	<!-- window management -->
	<div class="main-screen">
		<!-- Main desktop content -->
		<div class="desktop-content"></div>
	</div>

	<!-- Window Buttons -->
	<WindowButton
		showButtonPosition="top-right"
		showButtonText="Debug Panel"
		buttonIndex={1}
		isVisible={windowStates['debug-panel'].isOpen}
		onclick={handleDebugPanelButton}
	/>

	<WindowButton
		showButtonPosition="top-right"
		showButtonText="Tools"
		buttonIndex={2}
		isVisible={windowStates['tools-window'].isOpen}
		onclick={handleToolsButton}
	/>

	<!-- Window Managers -->
	<WindowManager
		windowState={windowStates['debug-panel']}
		onClose={() => closeWindow('debug-panel')}
		toggleMinimize={() => toggleWindowMinimized('debug-panel')}
		onPositionChange={(x, y) => updateWindowPosition('debug-panel', x, y)}
		onSizeChange={(w, h) => updateWindowSize('debug-panel', w, h)}
		onBringToFront={() => bringToFront('debug-panel')}
	>
		<PortfolioPage />
	</WindowManager>

	<WindowManager
		windowState={windowStates['tools-window']}
		onClose={() => closeWindow('tools-window')}
		toggleMinimize={() => toggleWindowMinimized('tools-window')}
		onPositionChange={(x, y) => updateWindowPosition('tools-window', x, y)}
		onSizeChange={(w, h) => updateWindowSize('tools-window', w, h)}
		onBringToFront={() => bringToFront('tools-window')}
	>
		<PortfolioPage />
	</WindowManager>

    <Clippy />

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
		z-index: 100;
	}

	.minimized {
		pointer-events: none;
		opacity: 0;
	}
</style>