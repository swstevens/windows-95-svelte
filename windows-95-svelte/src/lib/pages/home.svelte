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
	}

	.home-page {
		align-items: center;
		justify-content: center;
	}

	.image-section {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 20px;
	}

	.info-section {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-align: center;
	}

	.headspin {
		max-width: 100%;
		max-height: auto;
		width: 100%;
		height: auto;
	}

	h1 {
		margin: 0 0 20px 0;
		color: #000;
		font-family: 'Orbitron', 'MS Sans Serif', sans-serif;
		letter-spacing: 1px;
		font-size: 72px;
		font-weight: bold;
	}

	.center-text {
		text-align: center;
	}
</style>