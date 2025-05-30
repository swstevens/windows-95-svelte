<script lang="ts">
	import { onMount } from 'svelte';

	let { openWindows = [], restoreWindow } = $props();

	let now = $state(new Date());

	onMount(() => {
		const interval = setInterval(() => {
			now = new Date();
		}, 1000);

		return () => clearInterval(interval);
	});

	let formattedTime = $derived(now.toLocaleTimeString());

	function handleWindowClick(windowId:String) {
		if (restoreWindow) {
			restoreWindow(windowId);
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
		background-color: #c0c0c0;
		border-top: 1px solid #ffffff;
		align-items: center;
		font-family: 'MS Sans Serif', sans-serif;
		font-size: 11px;
	}

	.start-button {
		display: flex;
		align-items: center;
		height: 24px;
		min-width: 64px;
		border: 1px outset #c0c0c0;
		background-color: #c0c0c0;
		cursor: pointer;
	}

	.start-button:hover {
		background-color: #d4d0c8;
	}

	.start-button:active {
		border: 1px inset #c0c0c0;
	}

	.separator {
		width: 2px;
		height: 20px;
		border-left: 1px solid #808080;
		border-right: 1px solid #ffffff;
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
		border: 1px outset #c0c0c0;
		background-color: #c0c0c0;
		cursor: pointer;
		font-family: 'MS Sans Serif', sans-serif;
		font-size: 11px;
		padding: 0 8px;
		overflow: hidden;
	}

	.window-button:hover {
		background-color: #d4d0c8;
	}

	.window-button:active {
		border: 1px inset #c0c0c0;
	}

	.window-button.active {
		border: 1px inset #c0c0c0;
		background-color: #a0a0a0;
	}

	.window-button.minimized {
		background-color: #e0e0e0;
		border: 1px outset #c0c0c0;
	}

	.window-button.minimized:hover {
		background-color: #d4d0c8;
	}

	.clock {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 24px;
		min-width: 60px;
		border: 1px inset #c0c0c0;
		background-color: #c0c0c0;
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
