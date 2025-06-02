<!-- Clippy.svelte -->
<script lang="ts">
    import { onMount } from 'svelte';
    import Window from './window.svelte';
    
    let chatOpen = $state(false);
    let greeting = $state(false); // Start as false to prevent initial layout shift
    let currentMessage = $state('');
    let userInput = $state('');
    let isTyping = $state(false);
    let clippyState = $state('idle');
    let messagesContainer: HTMLElement | undefined;
  
    interface ChatMessage {
      sender: string;
      message: string;
      timestamp: Date;
    }
    let chatHistory = $state<ChatMessage[]>([]);
  
    // Auto-greet on mount with smoother timing
    onMount(() => {
      setTimeout(() => {
        currentMessage = "Hi! I'm Clippy, your AI assistant. Click me to chat!";
        greeting = true; // Set to true after message is ready
      }, 1000);
      
      // Auto-hide greeting after 5 seconds
      setTimeout(() => {
        greeting = false;
      }, 6000);
    });
    
    function handleClippyClick() {
      if (chatOpen) {
        closeChatbox();
      } else {
        openChatbox();
      }
    }
    
    function openChatbox() {
      chatOpen = true;
      greeting = false;
      clippyState = 'excited';
      
      if (chatHistory.length === 0) {
        chatHistory.push({
          sender: 'clippy',
          message: 'Hello! How can I help you today? Ask me anything!',
          timestamp: new Date()
        });
      }
      
      setTimeout(() => {
        clippyState = 'idle';
        scrollToBottom();
      }, 800);
    }
    
    function closeChatbox() {
      chatOpen = false;
      clippyState = 'idle';
    }
    
    function scrollToBottom() {
      if (messagesContainer) {
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
      }
    }
    
    async function sendMessage() {
      if (!userInput.trim()) return;
      
      const userMessage = userInput.trim();
      userInput = '';
      
      // Add user message to history
      chatHistory.push({
        sender: 'user',
        message: userMessage,
        timestamp: new Date()
      });
      
      // Scroll to bottom after user message
      setTimeout(scrollToBottom, 50);
      
      // Show typing indicator
      isTyping = true;
      clippyState = 'thinking';
      
      // Simulate AI response (replace with actual AI call)
      setTimeout(() => {
        const responses = [
          "That's an interesting question! Let me help you with that.",
          "I'd be happy to assist you with that task!",
          "Great question! Here's what I think...",
          "I can definitely help you figure that out!",
          "Let me process that for you...",
          "That's a common challenge. Here's my suggestion:",
          "I understand what you're looking for. Let me explain:",
          "Good thinking! Here's how I'd approach that:",
          "This is a really long response to test text wrapping and see how well the speech bubbles handle extended content that might span multiple lines and contain supercalifragilisticexpialidocious words that are extraordinarily long.",
          "Testing with URLs like https://www.verylongdomainnamethatmightcauseoverflowissues.com/very/long/path/names",
          "Numbers: 1234567890123456789012345678901234567890"
        ];
        
        const response = responses[Math.floor(Math.random() * responses.length)];
        
        chatHistory.push({
          sender: 'clippy',
          message: response,
          timestamp: new Date()
        });
        
        isTyping = false;
        clippyState = 'idle';
        
        // Scroll to bottom after AI response
        setTimeout(scrollToBottom, 50);
      }, 1500);
    }
    
    function handleKeyPress(event: KeyboardEvent) {
      if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        sendMessage();
      }
    }

    // Handle window state changes
    function handleWindowStateChange(isVisible: boolean, isMinimized: boolean) {
      if (!isVisible) {
        chatOpen = false;
        clippyState = 'idle';
      }
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
  {#if greeting && currentMessage && !chatOpen}
    <div class="speech-bubble greeting">
      {currentMessage}
    </div>
  {/if}
  
  <!-- Chat window using Window component -->
  <Window
    id="clippy-chat"
    windowTitle="💬 Chat with Clippy"
    isVisible={chatOpen}
    showButtonPosition="bottom-right"
    showButtonText=""
    onWindowStateChange={handleWindowStateChange}
    let:closeWindow
  >
    <div class="chat-content">
      <div class="chat-messages" bind:this={messagesContainer}>
        {#each chatHistory as message}
          <div class="message {message.sender}">
            <div class="message-bubble">
              {message.message}
            </div>
          </div>
        {/each}
        
        {#if isTyping}
          <div class="message clippy">
            <div class="message-bubble typing">
              <div class="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        {/if}
      </div>
      
      <div class="chat-input">
        <input
          type="text"
          bind:value={userInput}
          onkeypress={handleKeyPress}
          placeholder="Ask Clippy anything..."
          class="input-field"
        />
        <button onclick={sendMessage} class="send-btn">Send</button>
      </div>
    </div>
  </Window>
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
    transition: transform 0.2s ease; /* Shorter transition to reduce conflicts */
    background: transparent;
    border: none;
    padding: 0;
    transform-origin: center; /* Ensure consistent transform origin */
  }

  .clippy:hover {
    transform: scale(1.05); /* Slightly smaller hover effect */
  }

  .clippy-body {
    position: relative;
    width: 100%;
    height: 100%;
  }

  /* Paperclip styling */
  .paperclip {
    width: 60px;
    height: 70px;
    position: relative;
    margin: 5px auto;
  }

  .paperclip::before,
  .paperclip::after {
    content: '';
    position: absolute;
    border: 4px solid #4a90e2;
    border-radius: 20px;
  }

  .paperclip::before {
    width: 25px;
    height: 40px;
    left: 0;
    top: 0;
    border-right: none;
    animation: bounce 2s infinite ease-in-out;
  }

  .paperclip::after {
    width: 20px;
    height: 25px;
    right: 5px;
    bottom: 10px;
    border-left: none;
    border-top: none;
    animation: wiggle 3s infinite ease-in-out;
  }

  /* Eyes */
  .eyes {
    position: absolute;
    top: 15px;
    left: 8px;
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
    width: 200px; /* Fixed width instead of max-width */
    box-shadow: 2px 2px 0px #808080;
    animation: fadeIn 0.5s ease-in;
    word-break: break-word; /* Force break long words */
    overflow-wrap: anywhere; /* Most aggressive wrapping */
    hyphens: auto; /* Add hyphens for long words */
    line-height: 1.4; /* Better line spacing */
    box-sizing: border-box; /* Include padding in width calculation */
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

  /* Chat content styles */
  .chat-content {
    height: 100%;
    display: flex;
    flex-direction: column;
    background: white;
  }

  .chat-messages {
    flex: 1;
    overflow-y: auto;
    padding: 8px;
    scroll-behavior: smooth;
    background: white;
  }

  .message {
    margin-bottom: 12px;
    display: flex;
  }

  .message.user {
    justify-content: flex-end;
  }

  .message.clippy {
    justify-content: flex-start;
  }

  .message-bubble {
    max-width: 220px;
    min-width: 60px;
    padding: 8px 12px;
    border-radius: 8px;
    font-size: 11px;
    line-height: 1.4;
    word-break: break-word;
    overflow-wrap: anywhere;
    hyphens: auto;
    white-space: normal;
    box-sizing: border-box;
  }

  .message.user .message-bubble {
    background: #0078d4;
    color: white;
    border-bottom-right-radius: 3px;
  }

  .message.clippy .message-bubble {
    background: #ffffcc;
    border: 1px solid #ccc;
    border-bottom-left-radius: 3px;
  }

  .typing {
    padding: 8px 12px !important;
  }

  .typing-indicator {
    display: flex;
    gap: 3px;
    align-items: center;
  }

  .typing-indicator span {
    width: 4px;
    height: 4px;
    background: #666;
    border-radius: 50%;
    animation: typing 1.4s infinite ease-in-out;
  }

  .typing-indicator span:nth-child(2) {
    animation-delay: 0.2s;
  }

  .typing-indicator span:nth-child(3) {
    animation-delay: 0.4s;
  }

  .chat-input {
    display: flex;
    padding: 8px;
    background: #c0c0c0;
    gap: 4px;
    flex-shrink: 0;
    border-top: 1px solid #808080;
  }

  .input-field {
    flex: 1;
    padding: 4px 6px;
    border: 1px inset #c0c0c0;
    font-size: 11px;
    font-family: 'MS Sans Serif', sans-serif;
    min-width: 0;
  }

  .send-btn {
    background: #c0c0c0;
    border: 1px outset #c0c0c0;
    padding: 4px 8px;
    font-size: 11px;
    cursor: pointer;
    font-family: 'MS Sans Serif', sans-serif;
    flex-shrink: 0;
  }

  .send-btn:active {
    border: 1px inset #c0c0c0;
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

  @keyframes typing {
    0%, 60% { transform: translateY(0); }
    30% { transform: translateY(-8px); }
  }

  /* Scrollbar styling for Windows 95 feel */
  .chat-messages::-webkit-scrollbar {
    width: 16px;
  }

  .chat-messages::-webkit-scrollbar-track {
    background: #c0c0c0;
    border: 1px inset #c0c0c0;
  }

  .chat-messages::-webkit-scrollbar-thumb {
    background: #c0c0c0;
    border: 1px outset #c0c0c0;
  }

  .chat-messages::-webkit-scrollbar-thumb:hover {
    background: #d4d0c8;
  }

  .chat-messages::-webkit-scrollbar-thumb:active {
    border: 1px inset #c0c0c0;
    background: #a0a0a0;
  }

  .chat-messages::-webkit-scrollbar-corner {
    background: #c0c0c0;
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