<script lang="ts">
	import { onMount } from 'svelte';
	import type { Component } from 'svelte';

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

	interface Props {
		windowState: WindowState;
		contentComponent?: Component;
		contentProps?: Record<string, any>;
		children?: any;
		onClose?: () => void;
		toggleMinimize?: () => void;
		onPositionChange?: (x: number, y: number) => void;
		onSizeChange?: (width: number, height: number) => void;
		onBringToFront?: () => void;
	}

	let {
		windowState,
		contentComponent,
		contentProps = {},
		children,
		onClose,
		toggleMinimize,
		onPositionChange,
		onSizeChange,
		onBringToFront
	}: Props = $props();

	// Local dragging and resizing state
	let isDragging = $state(false);
	let isResizing = $state(false);
	let isMaximized = $state(false);
	let dragOffset = $state({ x: 0, y: 0 });
	let resizeOffset = $state({ x: 0, y: 0 });
	let previousState = $state({ x: 0, y: 0, width: 0, height: 0 });

	// Initialize window size on mount
	onMount(() => {
		if (onSizeChange) {
			const initialWidth = Math.floor(window.innerWidth - 2 * windowState.x);
			const initialHeight = Math.floor(window.innerHeight - 2 * windowState.y);
			onSizeChange(initialWidth, initialHeight);
		}
	});

	function handleDragStart(event: MouseEvent) {
		if (isMaximized) return;

		isDragging = true;
		const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
		dragOffset = {
			x: event.clientX - rect.left,
			y: event.clientY - rect.top
		};

		onBringToFront?.();
		event.preventDefault();
	}

	function handleResizeStart(event: MouseEvent) {
		if (isMaximized) return;

		isResizing = true;
		resizeOffset = {
			x: event.clientX - windowState.width,
			y: event.clientY - windowState.height
		};
		event.preventDefault();
		event.stopPropagation();
	}

	function handleMouseMove(event: MouseEvent) {
		if (isDragging && !isMaximized) {
			const newX = Math.max(0, Math.min(window.innerWidth - windowState.width, event.clientX - dragOffset.x));
			const newY = Math.max(0, Math.min(window.innerHeight - windowState.height, event.clientY - dragOffset.y));
			onPositionChange?.(newX, newY);
		} else if (isResizing && !isMaximized) {
			const newWidth = Math.max(200, event.clientX - resizeOffset.x);
			const newHeight = Math.max(150, event.clientY - resizeOffset.y);

			// Prevent window from going off screen
			const constrainedWidth = Math.min(newWidth, window.innerWidth - windowState.x);
			const constrainedHeight = Math.min(newHeight, window.innerHeight - windowState.y);
			
			onSizeChange?.(constrainedWidth, constrainedHeight);
		}
	}

	function handleMouseUp() {
		isDragging = false;
		isResizing = false;
	}

	function handleClose() {
		onClose?.();
	}

	function handleMinimize() {
		toggleMinimize?.();
	}

	function handleMaximize() {
		if (isMaximized) {
			// Restore to previous size and position
			onPositionChange?.(previousState.x, previousState.y);
			onSizeChange?.(previousState.width, previousState.height);
			isMaximized = false;
		} else {
			// Store current state before maximizing
			previousState = { 
				x: windowState.x, 
				y: windowState.y, 
				width: windowState.width, 
				height: windowState.height 
			};
			// Maximize to full viewport (account for toolbar)
			onPositionChange?.(0, 0);
			onSizeChange?.(window.innerWidth, window.innerHeight - 26);
			isMaximized = true;
		}
	}

	function handleWindowClick() {
		onBringToFront?.();
	}
</script>

<svelte:window onmousemove={handleMouseMove} onmouseup={handleMouseUp} />

{#if windowState.isOpen && !windowState.isMinimized}
	<div
		class="window"
		style="left: {windowState.x}px; top: {windowState.y}px; width: {windowState.width}px; height: {windowState.height}px; z-index: {windowState.zIndex};"
		onclick={handleWindowClick}
	>
		<!-- Title Bar -->
		<div class="title-bar" onmousedown={handleDragStart} role="button" tabindex="0">
			<span class="title">{windowState.title}</span>
			<div class="title-buttons">
				<button class="title-button minimize-button" onclick={handleMinimize} title="Minimize">
					_
				</button>
				<button
					class="title-button maximize-button"
					onclick={handleMaximize}
					title={isMaximized ? 'Restore' : 'Maximize'}
				>
					{#if isMaximized}
						⧉
					{:else}
						□
					{/if}
				</button>
				<button class="title-button close-button" onclick={handleClose} title="Close"> × </button>
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