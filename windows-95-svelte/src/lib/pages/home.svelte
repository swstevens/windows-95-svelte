<script lang="ts">
	// Props interface

	import { base } from '$app/paths';
	interface Props {
		windowWidth: number;
	}

	let { windowWidth }: Props = $props();
</script>

<div class="page home-page">
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
		font-family: 'Orbitron', 'MS Sans Serif', sans-serif;
		letter-spacing: 1px;
		font-size: 56px;
		font-weight: bold;
		line-height: 1.2;
	}

	.center-text {
		text-align: center;
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