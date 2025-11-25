<script lang="ts">
	import { onMount } from 'svelte';

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

	let { 
		openWindows = [] as WindowState[], 
		onWindowToggle 
	}: {
		openWindows: WindowState[];
		onWindowToggle?: (windowId: string) => void;
	} = $props();

	let now = $state(new Date());

	onMount(() => {
		const interval = setInterval(() => {
			now = new Date();
		}, 1000);
		return () => clearInterval(interval);
	});

	let formattedTime = $derived(now.toLocaleTimeString());

	function handleWindowClick(windowId: string) {
		if (onWindowToggle) {
			onWindowToggle(windowId);
		}
	}
</script>

<div class="taskbar">
	<!-- Start Button -->
	<div class="start-button">
		<span class="button-text">Start</span>
	</div>

	<!-- Separator -->
	<div class="separator"></div>

	<!-- Center area for open windows -->
	<div class="center-area">
		{#each openWindows as window (window.id)}
			<button
				class="window-button {window.isMinimized ? 'minimized' : 'active'}"
				onclick={() => handleWindowClick(window.id)}
				title={window.title}
			>
				<span class="button-text">{window.title}</span>
			</button>
		{/each}
	</div>

	<!-- Clock -->
	<div class="clock">
		<span class="button-text">{formattedTime}</span>
	</div>
</div>

<style>
	.taskbar {
		display: flex;
		width: 100%;
		height: 26px;
		background-color: #FAF4E6;
		border-top: 1px solid #e8dcc8;
		align-items: center;
		font-family: 'Space Mono', monospace;
		font-size: 11px;
	}

	.start-button {
		display: flex;
		align-items: center;
		height: 24px;
		min-width: 64px;
		border: 1px outset #FAF4E6;
		background-color: #FAF4E6;
		color: #4C545C;
		cursor: pointer;
	}

	.start-button:hover {
		background-color: #e8dcc8;
	}

	.start-button:active {
		border: 1px inset #FAF4E6;
	}

	.separator {
		width: 2px;
		height: 20px;
		border-left: 1px solid #FF8C00;
		border-right: 1px solid #e8dcc8;
		margin: 0 4px;
	}

	.center-area {
		flex: 1;
		display: flex;
		align-items: center;
		height: 24px;
		padding: 0 4px;
		gap: 2px;
	}

	.window-button {
		display: flex;
		align-items: center;
		height: 22px;
		min-width: 120px;
		max-width: 160px;
		border: 1px outset #FAF4E6;
		background-color: #FAF4E6;
		color: #4C545C;
		cursor: pointer;
		font-family: 'Space Mono', monospace;
		font-size: 11px;
		padding: 0 8px;
		overflow: hidden;
	}

	.window-button:hover {
		background-color: #e8dcc8;
	}

	.window-button:active {
		border: 1px inset #FAF4E6;
	}

	.window-button.active {
		border: 1px inset #FAF4E6;
		background-color: #d4c8a8;
	}

	.window-button.minimized {
		background-color: #e8dcc8;
		border: 1px outset #FAF4E6;
	}

	.window-button.minimized:hover {
		background-color: #e8dcc8;
	}

	.clock {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 24px;
		min-width: 60px;
		border: 1px inset #FAF4E6;
		background-color: #FAF4E6;
		color: #4C545C;
		padding: 0 4px;
	}

	.button-text {
		padding: 0 4px;
		user-select: none;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
</style>