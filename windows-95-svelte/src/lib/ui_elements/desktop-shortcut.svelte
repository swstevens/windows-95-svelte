<script lang="ts">
    interface Props {
        showButtonPosition?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
        showButtonText?: string;
        buttonIndex?: number;
        isVisible?: boolean;
        onclick?: () => void;
        imageUrl?: string;
    }
    
    let {
        showButtonPosition = 'top-left',
        showButtonText = 'Shortcut',
        buttonIndex = 0,
        isVisible = false,
        onclick,
        imageUrl = ''
    }: Props = $props();
    
    // Calculate offset based on button index to prevent overlapping
    const getButtonOffset = (index: number, position: string) => {
        const spacing = 80; // Increased spacing for desktop shortcuts
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
        class="desktop-shortcut {showButtonPosition} {isVisible ? 'always-visible' : ''}"
        style={getButtonOffset(buttonIndex, showButtonPosition)}
        onclick={onclick}
    >
        <div class="shortcut-icon">
            {#if imageUrl}
                <img src={imageUrl} alt={showButtonText} />
            {:else}
                <!-- Default icon if no image provided -->
                <div class="default-icon">📁</div>
            {/if}
        </div>
        <div class="shortcut-label">{showButtonText}</div>
    </button>
    
    <style>
        .desktop-shortcut {
            position: fixed;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 8px;
            background: transparent;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-family: 'MS Sans Serif', sans-serif;
            font-size: 11px;
            font-weight: normal;
            z-index: 100;
            width: 64px;
            text-align: center;
            transition: background-color 0.2s;
        }
    
        .desktop-shortcut:hover {
            background: rgba(255, 255, 255, 0.1);
        }
    
        .desktop-shortcut:active {
            background: rgba(255, 255, 255, 0.2);
        }
    
        .shortcut-icon {
            width: 32px;
            height: 32px;
            margin-bottom: 4px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
    
        .shortcut-icon img {
            width: 100%;
            height: 100%;
            object-fit: contain;
        }
    
        .default-icon {
            font-size: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
    
        .shortcut-label {
            word-wrap: break-word;
            line-height: 1.2;
            text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.7);
            max-width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
        }
    
        .desktop-shortcut.top-left {
            top: 20px;
            left: 20px;
        }
    
        .desktop-shortcut.top-right {
            top: 20px;
            right: 20px;
        }
    
        .desktop-shortcut.bottom-left {
            bottom: 80px; /* Account for toolbar */
            left: 20px;
        }
    
        .desktop-shortcut.bottom-right {
            bottom: 80px; /* Account for toolbar */
            right: 20px;
        }
    
        .desktop-shortcut.always-visible {
            opacity: 0.9;
        }
    
        .desktop-shortcut.always-visible:hover {
            opacity: 1;
        }
    </style>