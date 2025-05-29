<script lang='ts'>
    interface Props {
      showButtonPosition?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
      showButtonText?: string;
      buttonIndex?: number;
    }
  
    let { 
      showButtonPosition = 'top-left',
      showButtonText = 'Show Window',
      buttonIndex = 0
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
  
    let x = $state(50 + buttonIndex * 30); // Offset initial window position too
    let y = $state(50 + buttonIndex * 30);
    let width = $state(300);
    let height = $state(200);
    let isDragging = $state(false);
    let isResizing = $state(false);
    let isVisible = $state(true);
    let dragOffset = $state({ x: 0, y: 0 });
    let resizeOffset = $state({ x: 0, y: 0 });
  
    function handleDragStart(event: MouseEvent) {
      isDragging = true;
      const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
      dragOffset = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
      };
      event.preventDefault();
    }
  
    function handleResizeStart(event: MouseEvent) {
      isResizing = true;
      resizeOffset = {
        x: event.clientX - width,
        y: event.clientY - height
      };
      event.preventDefault();
      event.stopPropagation(); // Stop event from bubbling to drag handler
    }
  
    function handleMouseMove(event: MouseEvent) {
      if (isDragging) {
        x = event.clientX - dragOffset.x;
        y = event.clientY - dragOffset.y;
      } else if (isResizing) {
        width = Math.max(200, event.clientX - resizeOffset.x); // Min width 200px
        height = Math.max(150, event.clientY - resizeOffset.y); // Min height 150px
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
    }
  </script>
  
  <svelte:window 
    onmousemove={handleMouseMove} 
    onmouseup={handleMouseUp} 
  />
  
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
  
  {#if isVisible}
    <div 
      class="window"
      style="left: {x}px; top: {y}px; width: {width}px; height: {height}px;"
    >
      <!-- Title Bar -->
      <div 
        class="title-bar"
        onmousedown={handleDragStart}
        role="button"
        tabindex="0"
      >
        <span class="title">Draggable Window</span>
        <button class="close-button" onclick={closeWindow}>
          ×
        </button>
      </div>
  
      <!-- Content Area -->
      <div class="content">
        <p>This is a draggable and resizable window!</p>
        <p>Position: ({x}, {y})</p>
        <p>Size: {width} × {height}</p>
        <p>• Drag the title bar to move</p>
        <p>• Click the × to close</p>
        <p>• Drag the bottom-right corner to resize</p>
      </div>
  
      <!-- Resize Handle -->
      <div 
        class="resize-handle"
        onmousedown={handleResizeStart}
        role="button"
        tabindex="0"
      ></div>
    </div>
  {/if}
  
  <style>
    .show-button {
      position: fixed;
      padding: 8px 16px;
      background: #4299e1;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
      z-index: 1000;
      transition: all 0.2s ease;
    }
  
    .show-button:hover {
      background: #3182ce;
      transform: scale(1.05);
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
      bottom: 20px;
      left: 20px;
    }
  
    .show-button.bottom-right {
      bottom: 20px;
      right: 20px;
    }
  
    .show-button.always-visible {
      opacity: 0.7;
    }
  
    .show-button.always-visible:hover {
      opacity: 1;
    }
  
    .window {
      position: absolute;
      background: white;
      border: 1px solid #d1d5db;
      border-radius: 8px;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
      overflow: hidden;
      user-select: none;
      min-width: 200px;
      min-height: 150px;
    }
  
    .title-bar {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 12px 16px;
      cursor: grab;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 20px;
    }
  
    .title-bar:active {
      cursor: grabbing;
    }
  
    .title {
      font-weight: 600;
      font-size: 14px;
    }
  
    .close-button {
      background: rgba(255, 255, 255, 0.2);
      border: none;
      color: white;
      width: 24px;
      height: 24px;
      border-radius: 4px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      font-weight: bold;
      transition: background-color 0.2s;
    }
  
    .close-button:hover {
      background: rgba(255, 255, 255, 0.3);
    }
  
    .content {
      padding: 20px;
      font-family: Arial, sans-serif;
      font-size: 14px;
      line-height: 1.5;
      height: calc(100% - 44px); /* Subtract title bar height */
      overflow: auto;
    }
  
    .content p {
      margin: 0 0 8px 0;
    }
  
    .resize-handle {
      position: absolute;
      bottom: 0;
      right: 0;
      width: 20px;
      height: 20px;
      cursor: nw-resize;
      background: linear-gradient(135deg, transparent 0%, transparent 30%, #cbd5e0 30%, #cbd5e0 100%);
    }
  
    .resize-handle:hover {
      background: linear-gradient(135deg, transparent 0%, transparent 30%, #a0aec0 30%, #a0aec0 100%);
    }
  </style>