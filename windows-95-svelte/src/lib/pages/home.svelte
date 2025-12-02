<script lang="ts">
	// Props interface

	import { base } from '$app/paths';
	interface Props {
		windowWidth: number;
		showScanlines?: boolean;
		onToggleScanlines?: () => void;
	}

	let { windowWidth, showScanlines = true, onToggleScanlines }: Props = $props();
</script>

<div class="page home-page">
	<div class="scanlines-control">
		<span class="scanlines-label">scanlines:</span>
		<button class="scanlines-toggle" onclick={onToggleScanlines} title="Toggle scanlines">
			{showScanlines ? '☑' : '☐'}
		</button>
	</div>
	<div class="image-section">
		<img src="{base}/headspin-square-unscreen.gif" alt="my head" class="headspin" />
	</div>
	<div class="info-section">
		<h1 class={windowWidth <= 480 ? 'center-text' : ''}>SHEA STEVENS</h1>
	</div>
</div>

<style>
	.page {
		display: flex;
		flex-direction: column;
		height: 100%;
		padding: 8px;
		min-height: 0;
		position: relative;
	}

	.home-page {
		align-items: center;
		justify-content: center;
		gap: 12px;
	}

	.image-section {
		flex: 0 1 auto;
		display: flex;
		align-items: center;
		justify-content: center;
		min-height: 0;
		max-height: 40vh;
	}

	.info-section {
		flex: 0 1 auto;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-align: center;
		min-height: 0;
	}

	.headspin {
		max-width: 100%;
		max-height: 100%;
		width: auto;
		height: auto;
		object-fit: contain;
	}

	h1 {
		margin: 0;
		color: #4C545C;
		font-family: 'Zen Dots', 'MS Sans Serif', sans-serif;
		letter-spacing: 1px;
		font-size: 56px;
		font-weight: bold;
		line-height: 1.2;
	}

	.center-text {
		text-align: center;
	}

	.scanlines-control {
		position: absolute;
		top: 8px;
		right: 8px;
		display: flex;
		align-items: center;
		gap: 6px;
		z-index: 100;
	}

	.scanlines-label {
		color: #000;
		font-family: 'Space Mono', monospace;
		font-size: 11px;
		font-weight: bold;
		user-select: none;
	}

	.scanlines-toggle {
		width: 20px;
		height: 20px;
		padding: 0;
		background: #C0C0C0;
		border: 2px outset #DFDFDF;
		border-right-color: #808080;
		border-bottom-color: #808080;
		color: #000;
		font-size: 14px;
		cursor: pointer;
		font-family: 'MS Sans Serif', Arial, sans-serif;
		font-weight: bold;
		display: flex;
		align-items: center;
		justify-content: center;
		user-select: none;
		line-height: 1;
		flex-shrink: 0;
	}

	.scanlines-toggle:active {
		border: 2px inset #DFDFDF;
		border-right-color: #FFFFFF;
		border-bottom-color: #FFFFFF;
	}

	@media (max-width: 600px) {
		.home-page {
			gap: 8px;
		}

		.image-section {
			max-height: 35vh;
		}

		h1 {
			font-size: 32px;
		}
	}

	@media (max-height: 600px) {
		.image-section {
			max-height: 30vh;
		}

		h1 {
			font-size: 28px;
		}
	}
</style>