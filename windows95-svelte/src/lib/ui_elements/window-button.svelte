<script lang="ts">
	interface Props {
		showButtonPosition?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
		showButtonText?: string;
		buttonIndex?: number;
		isVisible?: boolean;
		onclick?: () => void;
	}

	let {
		showButtonPosition = 'top-left',
		showButtonText = 'Show Window',
		buttonIndex = 0,
		isVisible = false,
		onclick
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
</script>

<button
	class="show-button {showButtonPosition} {isVisible ? 'always-visible' : ''}"
	style={getButtonOffset(buttonIndex, showButtonPosition)}
	onclick={onclick}
>
	{showButtonText}
</button>

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
</style>