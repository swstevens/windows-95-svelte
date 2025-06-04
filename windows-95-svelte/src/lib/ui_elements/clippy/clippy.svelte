<!-- Clippy.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  
  interface Props {
      onRequestChatWindow?: () => void;
  }
  
  let { onRequestChatWindow }: Props = $props();
  
  let greeting = $state(false);
  let currentMessage = $state('');
  let clippyState = $state('idle');

  // Auto-greet on mount with smoother timing
  onMount(() => {
    setTimeout(() => {
      currentMessage = "Hi! I'm Clippy, your AI assistant. Click me to chat!";
      greeting = true;
    }, 1000);
    
    // Auto-hide greeting after 5 seconds
    setTimeout(() => {
      greeting = false;
    }, 6000);
  });
  
  function handleClippyClick() {
    greeting = false;
    clippyState = 'excited';
    
    // Request parent to open chat window
    onRequestChatWindow?.();
    
    setTimeout(() => {
      clippyState = 'idle';
    }, 800);
  }
</script>

<div class="clippy-container">
<button 
  class="clippy {clippyState}" 
  onclick={handleClippyClick}
  type="button"
  aria-label="clippy"
>
  <div class="clippy-body">
    <div class="paperclip"></div>
    <div class="eyes">
      <div class="eye left"></div>
      <div class="eye right"></div>
    </div>
  </div>
</button>

<!-- Greeting bubble -->
{#if greeting && currentMessage}
  <div class="speech-bubble greeting">
    {currentMessage}
  </div>
{/if}
</div>

<style>
.clippy-container {
  position: fixed;
  bottom: 100px;
  right: 50px;
  z-index: 1000;
  font-family: 'MS Sans Serif', sans-serif;
}

.clippy {
  width: 80px;
  height: 80px;
  cursor: pointer;
  transition: transform 0.2s ease;
  background: transparent;
  border: none;
  padding: 0;
  transform-origin: center;
}

.clippy:hover {
  transform: scale(1.05);
}

.clippy-body {
  position: relative;
  width: 100%;
  height: 100%;
}

/* Paperclip styling - Two matching shapes */
.paperclip {
  width: 40px;
  height: 60px;
  position: absolute;
  top: 5px;
  left: 50%;
  transform: translateX(-50%);
  border: 4px solid #4a90e2;
  border-radius: 20px 20px 8px 8px;
  background: transparent;
  animation: bounce 2s infinite ease-in-out;
}

.paperclip::before {
  content: '';
  position: absolute;
  width: 24px;
  height: 35px;
  right: 8px;
  bottom: 10px;
  border: 4px solid #4a90e2;
  border-radius: 20px 20px 8px 8px;
  background: transparent;
  animation: wiggle 3s infinite ease-in-out;
}

/* Eyes - positioned relative to the paperclip */
.eyes {
  position: absolute;
  top: 18px;
  left: 70%;
  transform: translateX(-50%);
  width: 30px;
  height: 12px;
}

.eye {
  width: 8px;
  height: 8px;
  background: #000;
  border-radius: 50%;
  position: absolute;
  animation: blink 4s infinite;
}

.eye.left {
  left: 2px;
}

.eye.right {
  right: 2px;
}

/* Greeting speech bubble */
.speech-bubble.greeting {
  position: absolute;
  bottom: 90px;
  right: -20px;
  background: #ffffcc;
  border: 2px solid #000;
  border-radius: 10px;
  padding: 12px 16px;
  font-size: 12px;
  width: 200px;
  box-shadow: 2px 2px 0px #808080;
  animation: fadeIn 0.5s ease-in;
  word-break: break-word;
  overflow-wrap: anywhere;
  hyphens: auto;
  line-height: 1.4;
  box-sizing: border-box;
}

.speech-bubble.greeting::after {
  content: '';
  position: absolute;
  bottom: -10px;
  right: 30px;
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-top: 10px solid #ffffcc;
}

.speech-bubble.greeting::before {
  content: '';
  position: absolute;
  bottom: -12px;
  right: 28px;
  width: 0;
  height: 0;
  border-left: 12px solid transparent;
  border-right: 12px solid transparent;
  border-top: 12px solid #000;
}

/* Animations */
@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}

@keyframes wiggle {
  0%, 100% { transform: rotate(0deg); }
  25% { transform: rotate(5deg); }
  75% { transform: rotate(-5deg); }
}

@keyframes blink {
  0%, 90%, 100% { height: 8px; }
  95% { height: 2px; }
}

@keyframes excited {
  0%, 100% { transform: scale(1) rotate(0deg); }
  25% { transform: scale(1.1) rotate(5deg); }
  50% { transform: scale(1.15) rotate(0deg); }
  75% { transform: scale(1.1) rotate(-5deg); }
}

.clippy.excited {
  animation: excited 0.8s ease-in-out;
}

@keyframes thinking {
  0%, 100% { transform: rotate(0deg); }
  50% { transform: rotate(8deg); }
}

.clippy.thinking {
  animation: thinking 1s ease-in-out infinite;
}

@keyframes fadeIn {
  from { 
    opacity: 0; 
    transform: scale(0.9) translateY(5px); 
  }
  to { 
    opacity: 1; 
    transform: scale(1) translateY(0); 
  }
}

/* Responsive adjustments */
@media (max-width: 480px) {
  .clippy-container {
    bottom: 80px;
    right: 20px;
  }
  
  .speech-bubble.greeting {
    max-width: 200px;
    right: -10px;
  }
  
  .clippy {
    width: 70px;
    height: 70px;
  }
  
  .paperclip {
    width: 50px;
    height: 60px;
  }
}

@media (max-width: 320px) {
  .clippy-container {
    bottom: 60px;
    right: 10px;
  }
  
  .speech-bubble.greeting {
    width: 180px;
    font-size: 11px;
    right: 0px;
  }
}
</style>