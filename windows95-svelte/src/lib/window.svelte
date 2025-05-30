<script lang="ts">
	import { onMount } from 'svelte';
	import type { Component } from 'svelte';

	interface Props {
		id?: string;
		showButtonPosition?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
		showButtonText?: string;
		buttonIndex?: number;
		windowTitle?: string;
		contentComponent?: Component;
		contentProps?: Record<string, any>;
		children?: any;
		onWindowStateChange?: (isVisible: boolean, isMinimized: boolean) => void;
	}

	let {
		id = 'window-' + Math.random().toString(36).substr(2, 9),
		showButtonPosition = 'top-left',
		showButtonText = 'Show Window',
		buttonIndex = 0,
		windowTitle = 'Window',
		contentComponent,
		contentProps = {},
		children,
		onWindowStateChange
	}: Props = $props();

	// Calculate offset based on button index to prevent overlapping
	const getButtonOffset = (index: number, position: string) => {
		const spacing = 50; // 50px spacing between buttons
		const offset = index * spacing;

		switch (position) {
			case 'top-left':
			case 'bottom-left':
				return `transform: translateY(${offset}px);`;
			case 'top-right':
			case 'bottom-right':
				return `transform: translateY(${offset}px);`;
			default:
				return '';
		}
	};

	// Window state using Svelte 5 runes
	let x = $state(50 + buttonIndex * 30);
	let y = $state(50 + buttonIndex * 30);
	let width = $state(800);
	let height = $state(600);
	let isDragging = $state(false);
	let isResizing = $state(false);
	let isVisible = $state(false); // Start with window closed
	let isMinimized = $state(false);
	let isMaximized = $state(false);
	let dragOffset = $state({ x: 0, y: 0 });
	let resizeOffset = $state({ x: 0, y: 0 });
	let previousState = $derived({
		x: 50 + buttonIndex * 30,
		y: 50 + buttonIndex * 30,
		width: width,
		height: height
	});
	let zIndex = $state(1000 + buttonIndex);

	// Watch for window state changes and notify parent
	$effect(() => {
		if (onWindowStateChange) {
			onWindowStateChange(isVisible, isMinimized);
		}
	});

	// Listen for restore events from toolbar
	onMount(() => {
    width = Math.floor(window.innerWidth - 2*x);
    height = Math.floor(window.innerHeight -2*y);
		const handleRestore = (event: Event) => {
      if (event instanceof CustomEvent) {
            const customEvent = event as CustomEvent;
            // Access properties like customEvent.detail
            if (customEvent.detail.id === id) {
              if (isVisible && isMinimized) {
                isMinimized = false;
                // Bring window to front
                zIndex = Date.now();
              } else if (!isVisible) {
                showWindow();
              }
            }
        }

		};

		window.addEventListener('restore-window', handleRestore);

		return () => {
			window.removeEventListener('restore-window', handleRestore);
		};
	});

	function handleDragStart(event: MouseEvent) {
		if (isMaximized) return; // Don't allow dragging when maximized

		isDragging = true;
		const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
		dragOffset = {
			x: event.clientX - rect.left,
			y: event.clientY - rect.top
		};

		// Bring window to front
		zIndex = Date.now();
		event.preventDefault();
	}

	function handleResizeStart(event: MouseEvent) {
		if (isMaximized) return; // Don't allow resizing when maximized

		isResizing = true;
		resizeOffset = {
			x: event.clientX - width,
			y: event.clientY - height
		};
		event.preventDefault();
		event.stopPropagation();
	}

	function handleMouseMove(event: MouseEvent) {
		if (isDragging && !isMaximized) {
			x = Math.max(0, Math.min(window.innerWidth - width, event.clientX - dragOffset.x));
			y = Math.max(0, Math.min(window.innerHeight - height, event.clientY - dragOffset.y));
		} else if (isResizing && !isMaximized) {
			const newWidth = Math.max(200, event.clientX - resizeOffset.x);
			const newHeight = Math.max(150, event.clientY - resizeOffset.y);

			// Prevent window from going off screen
			width = Math.min(newWidth, window.innerWidth - x);
			height = Math.min(newHeight, window.innerHeight - y);
		}
	}

	function handleMouseUp() {
		isDragging = false;
		isResizing = false;
	}

	function closeWindow() {
		isVisible = false;
	}

	function showWindow() {
		isVisible = true;
		isMinimized = false;
		zIndex = Date.now(); // Bring to front
	}

	function minimizeWindow() {
		isMinimized = true;
	}

	function maximizeWindow() {
		if (isMaximized) {
			// Restore to previous size and position
			x = previousState.x;
			y = previousState.y;
			width = previousState.width;
			height = previousState.height;
			isMaximized = false;
		} else {
			// Store current state before maximizing
			previousState = { x, y, width, height };
			// Maximize to full viewport (account for toolbar)
			x = 0;
			y = 0;
			width = window.innerWidth;
			height = window.innerHeight - 26; // Subtract toolbar height
			isMaximized = true;
		}
	}

	function handleWindowClick() {
		// Bring window to front when clicked
		zIndex = Date.now();
	}
</script>

<svelte:window onmousemove={handleMouseMove} onmouseup={handleMouseUp} />

{#if !isVisible}
	<button
		class="show-button {showButtonPosition}"
		style={getButtonOffset(buttonIndex, showButtonPosition)}
		onclick={showWindow}
	>
		{showButtonText}
	</button>
{:else}
	<button
		class="show-button always-visible {showButtonPosition}"
		style={getButtonOffset(buttonIndex, showButtonPosition)}
		onclick={showWindow}
	>
		{showButtonText}
	</button>
{/if}

{#if isVisible && !isMinimized}
	<div
		class="window"
		style="left: {x}px; top: {y}px; width: {width}px; height: {height}px; z-index: {zIndex};"
		onclick={handleWindowClick}
	>
		<!-- Title Bar -->
		<div class="title-bar" onmousedown={handleDragStart} role="button" tabindex="0">
			<span class="title">{windowTitle}</span>
			<div class="title-buttons">
				<button class="title-button minimize-button" onclick={minimizeWindow} title="Minimize">
					_
				</button>
				<button
					class="title-button maximize-button"
					onclick={maximizeWindow}
					title={isMaximized ? 'Restore' : 'Maximize'}
				>
					{#if isMaximized}
						⧉
					{:else}
						□
					{/if}
				</button>
				<button class="title-button close-button" onclick={closeWindow} title="Close"> × </button>
			</div>
		</div>

		<!-- Content Area -->
		<div class="content">
			{#if contentComponent}
				{#if typeof contentComponent === 'function'}
					{@const ComponentConstructor = contentComponent}
					<ComponentConstructor {...contentProps}></ComponentConstructor>
				{:else}
					<contentComponent {...contentProps}></contentComponent>
				{/if}
			{:else if children}
				{@render children()}
			{:else}
				<p>No content provided</p>
			{/if}
		</div>

		<!-- Resize Handle -->
		{#if !isMaximized}
			<div class="resize-handle" onmousedown={handleResizeStart} role="button" tabindex="0"></div>
		{/if}
	</div>
{/if}

<style>
	.show-button {
		position: fixed;
		padding: 4px 8px;
		background: #c0c0c0;
		color: black;
		border: 2px outset #c0c0c0;
		border-radius: 0;
		cursor: pointer;
		font-family: 'MS Sans Serif', sans-serif;
		font-size: 11px;
		font-weight: normal;
		z-index: 1000;
		min-width: 75px;
		text-align: center;
	}

	.show-button:hover {
		background: #d4d0c8;
	}

	.show-button:active {
		border: 2px inset #c0c0c0;
		background: #a0a0a0;
	}

	.show-button.top-left {
		top: 20px;
		left: 20px;
	}

	.show-button.top-right {
		top: 20px;
		right: 20px;
	}

	.show-button.bottom-left {
		bottom: 60px; /* Account for toolbar */
		left: 20px;
	}

	.show-button.bottom-right {
		bottom: 60px; /* Account for toolbar */
		right: 20px;
	}

	.show-button.always-visible {
		opacity: 0.8;
	}

	.show-button.always-visible:hover {
		opacity: 1;
	}

	.window {
		position: absolute;
		background: #c0c0c0;
		border: 2px outset #c0c0c0;
		border-radius: 0;
		box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
		overflow: hidden;
		user-select: none;
		min-width: 200px;
		min-height: 150px;
		font-family: 'MS Sans Serif', sans-serif;
		font-size: 11px;
	}

	.title-bar {
		background: linear-gradient(90deg, #0000ff 0%, #000080 100%);
		color: white;
		padding: 2px 4px;
		cursor: grab;
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 18px;
		border-bottom: 1px solid #808080;
	}

	.title-bar:active {
		cursor: grabbing;
	}

	.title {
		font-weight: bold;
		font-size: 11px;
		font-family: 'MS Sans Serif', sans-serif;
		padding-left: 4px;
	}

	.title-buttons {
		display: flex;
		gap: 1px;
	}

	.title-button {
		background: #c0c0c0;
		border: 1px outset #c0c0c0;
		color: black;
		width: 16px;
		height: 14px;
		border-radius: 0;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 10px;
		font-weight: bold;
		font-family: 'MS Sans Serif', sans-serif;
		line-height: 1;
	}

	.title-button:hover {
		background: #d4d0c8;
	}

	.title-button:active {
		border: 1px inset #c0c0c0;
		background: #a0a0a0;
	}

	.minimize-button {
		font-size: 12px;
		padding-top: 2px;
	}

	.maximize-button {
		font-size: 9px;
	}

	.content {
		padding: 8px;
		font-family: 'MS Sans Serif', sans-serif;
		font-size: 11px;
		line-height: 1.3;
		height: calc(100% - 22px); /* Subtract title bar height */
		overflow: auto;
		background: #c0c0c0;
		border: 1px inset #c0c0c0;
		margin: 2px;
	}

	.content p {
		margin: 0 0 4px 0;
	}

	.resize-handle {
		position: absolute;
		bottom: 2px;
		right: 2px;
		width: 12px;
		height: 12px;
		cursor: nw-resize;
		background:
			linear-gradient(45deg, transparent 30%, #808080 30%, #808080 40%, transparent 40%),
			linear-gradient(45deg, transparent 60%, #808080 60%, #808080 70%, transparent 70%);
		background-size: 4px 4px;
	}

	.resize-handle:hover {
		background:
			linear-gradient(45deg, transparent 30%, #606060 30%, #606060 40%, transparent 40%),
			linear-gradient(45deg, transparent 60%, #606060 60%, #606060 70%, transparent 70%);
		background-size: 4px 4px;
	}
</style>
