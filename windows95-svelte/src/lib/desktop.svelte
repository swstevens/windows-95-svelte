<script lang="ts">
	import { onMount } from 'svelte';
	import Placeholder from './placeholder.svelte';
	import Toolbar from './toolbar.svelte';
	import Window from './window.svelte';
	import Settings from './settings.svelte';
	import Home from './pages/home.svelte';
	import HomeAlternate from './pages/home_alternate.svelte';

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
    isMinimized: boolean;
    }
    let openWindows = $state<WindowState[]>([]);

	// Functions to manage window state
	function addWindow(id:string, title:string, isMinimized = false) {
		const existingWindowIndex = openWindows.findIndex((w) => w['id'] === id);
		if (existingWindowIndex === -1) {
			openWindows.push({ id, title, isMinimized });
		} else {
			// Update existing window
			openWindows[existingWindowIndex] = { id, title, isMinimized };
		}
	}

	function removeWindow(id:string) {
		const index = openWindows.findIndex((w) => w['id'] === id);
		if (index !== -1) {
			openWindows.splice(index, 1);
		}
	}

	function updateWindowState(id:string, isMinimized:boolean) {
		const windowIndex = openWindows.findIndex((w) => w['id'] === id);
		if (windowIndex !== -1) {
			openWindows[windowIndex].isMinimized = isMinimized;
		}
	}

	function restoreWindow(id:string) {
		// Dispatch custom event to restore the specific window
		const event = new CustomEvent('restore-window', { detail: { id } });
		window.dispatchEvent(event);

		// Update the window state in our tracking
		updateWindowState(id, false);
	}

	// Handle window state changes from child Window components
	function handleWindowStateChange(id:string, title:string) {
		return (isVisible:boolean, isMinimized:boolean) => {
			if (isVisible && !isMinimized) {
				addWindow(id, title, false);
			} else if (isVisible && isMinimized) {
				updateWindowState(id, true);
			} else {
				removeWindow(id);
			}
		};
	}
</script>

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

	<!-- Windows -->
	<Window
		id="debug-panel"
		showButtonPosition="top-right"
		showButtonText="Debug Panel"
		buttonIndex={1}
		contentProps={{ theme: 'dark', username: 'John' }}
		windowTitle="Settings"
		onWindowStateChange={handleWindowStateChange('debug-panel', 'Settings')}
	>
		<HomeAlternate />
	</Window>

	<Window
		id="tools-window"
		showButtonPosition="top-right"
		showButtonText="Tools"
		buttonIndex={2}
		windowTitle="Home"
		onWindowStateChange={handleWindowStateChange('tools-window', 'Home')}
	>
		<Home />
	</Window>

	<!-- Toolbar at bottom -->
	<div class="toolbar">
		<Toolbar {openWindows} {restoreWindow} />
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
	}

	.main-screen {
		flex-grow: 1;
		position: relative;
		overflow: hidden;
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
