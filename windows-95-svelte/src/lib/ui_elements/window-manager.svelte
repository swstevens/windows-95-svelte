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
		isMobile?: boolean;
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
		onBringToFront,
		isMobile = false
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
		if (isMobile) {
			// On mobile, maximize immediately
			previousState = {
				x: windowState.x,
				y: windowState.y,
				width: windowState.width,
				height: windowState.height
			};
			onPositionChange?.(0, 0);
			onSizeChange?.(window.innerWidth, window.innerHeight - 32);
			isMaximized = true;
		} else if (onSizeChange) {
			const initialWidth = Math.floor(window.innerWidth - 2 * windowState.x);
			const initialHeight = Math.floor(window.innerHeight - 2 * windowState.y);
			onSizeChange(initialWidth, initialHeight);
		}
	});

	function handleDragStart(event: MouseEvent) {
		if (isMaximized || isMobile) return;

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
		if (isMaximized || isMobile) return;

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
			const newY = Math.max(0, Math.min(window.innerHeight - windowState.height-32, event.clientY - dragOffset.y));
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
			onSizeChange?.(window.innerWidth, window.innerHeight - 32);
			isMaximized = true;
		}
	}

	let windowElement: HTMLDivElement | undefined = $state();

	function handleWindowClick(event: MouseEvent) {
		// Don't steal focus from input elements or textareas
		const target = event.target as HTMLElement;
		if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.tagName === 'BUTTON') {
			// Still bring window to front, but don't focus the window div
			onBringToFront?.();
			scrollWindowIntoView();
			return;
		}

		onBringToFront?.();
		scrollWindowIntoView();
		// Only focus the window div if we're not clicking on an interactive element
		windowElement?.focus();
	}

	function scrollWindowIntoView() {
		if (windowElement) {
			windowElement.scrollIntoView({
				behavior: 'smooth',
				block: 'nearest',
				inline: 'nearest'
			});
		}
	}

	function handleKeyDown(event: KeyboardEvent) {
		// Escape key closes the dialog (standard behavior)
		if (event.key === 'Escape') {
			event.preventDefault();
			handleClose();
		}
		// Allow other key events to bubble
	}
</script>

<svelte:window onmousemove={handleMouseMove} onmouseup={handleMouseUp} />

{#if windowState.isOpen && !windowState.isMinimized}
	<div
		bind:this={windowElement}
		class="window"
		class:mobile-fullscreen={isMobile && isMaximized}
		style="left: {windowState.x}px; top: {windowState.y}px; width: {windowState.width}px; height: {windowState.height}px; z-index: {windowState.zIndex};"
		role="dialog"
		aria-label={windowState.title}
		tabindex="0"
		onclick={handleWindowClick}
		onkeydown={handleKeyDown}
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
		{#if !isMaximized && !isMobile}
			<div class="resize-handle" onmousedown={handleResizeStart} role="button" tabindex="0"></div>
		{/if}
	</div>
{/if}

<style>
	.window {
		position: absolute;
		background: #FAF4E6;
		border: 2px outset #FAF4E6;
		border-radius: 0;
		box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
		overflow: hidden;
		user-select: none;
		min-width: 200px;
		min-height: 150px;
		font-family: 'Space Mono', monospace;
		font-size: 11px;
	}

	.window.mobile-fullscreen {
		border: none;
		box-shadow: none;
		border-radius: 0;
	}

	.title-bar {
		background: linear-gradient(90deg, #FF8C00 0%, #e67e00 100%);
		color: #FAF4E6;
		padding: 2px 4px;
		cursor: grab;
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 18px;
		border-bottom: 1px solid #438848;
	}

	.title-bar:active {
		cursor: grabbing;
	}

	.title {
		font-weight: bold;
		font-size: 11px;
		font-family: 'Space Mono', monospace;
		padding-left: 4px;
	}

	.title-buttons {
		display: flex;
		gap: 1px;
	}

	.title-button {
		background: #FAF4E6;
		border: 1px outset #FAF4E6;
		color: #4C545C;
		width: 16px;
		height: 14px;
		border-radius: 0;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 10px;
		font-weight: bold;
		font-family: 'Space Mono', monospace;
		line-height: 1;
	}

	.title-button:hover {
		background: #e8dcc8;
	}

	.title-button:active {
		border: 1px inset #FAF4E6;
		background: #d4c8a8;
	}

	.minimize-button {
		font-size: 12px;
		padding-top: 2px;
		padding-bottom: 10px;
	}

	.maximize-button {
		font-size: 9px;
	}

	.content {
		padding: 8px;
		font-family: 'Space Mono', monospace;
		font-size: 11px;
		line-height: 1.3;
		height: calc(100% - 22px); /* Subtract title bar height */
		overflow: auto;
		background: #FAF4E6;
		border: 1px inset #FAF4E6;
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
			linear-gradient(45deg, transparent 30%, #FF8C00 30%, #FF8C00 40%, transparent 40%),
			linear-gradient(45deg, transparent 60%, #FF8C00 60%, #FF8C00 70%, transparent 70%);
		background-size: 4px 4px;
	}

	.resize-handle:hover {
		background:
			linear-gradient(45deg, transparent 30%, #438848 30%, #438848 40%, transparent 40%),
			linear-gradient(45deg, transparent 60%, #438848 60%, #438848 70%, transparent 70%);
		background-size: 4px 4px;
	}
</style>
