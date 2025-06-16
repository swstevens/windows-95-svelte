<!-- ClippyChat.svelte -->
<script lang="ts">
    import { onMount } from 'svelte';
    
    let userInput = $state('');
    let isTyping = $state(false);
    let messagesContainer: HTMLElement | undefined;

    interface ChatMessage {
      sender: string;
      message: string;
      timestamp: Date;
    }
    let chatHistory = $state<ChatMessage[]>([]);

    onMount(() => {
      // Initial greeting when chat opens
      chatHistory.push({
        sender: 'clippy',
        message: 'Hello! How can I help you today? Ask me anything!',
        timestamp: new Date()
      });
      
      setTimeout(scrollToBottom, 50);
    });
    
    function scrollToBottom() {
      if (messagesContainer) {
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
      }
    }
    
    async function sendMessage() {
      if (!userInput.trim() || isTyping) return;
      
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
      
      try {
        const response = await fetch('http://swstevens.duckdns.org/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message: userMessage }),
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Add AI response to history
        chatHistory.push({
          sender: 'clippy',
          message: data.response || data.message || 'Sorry, I didn\'t understand that.',
          timestamp: new Date()
        });
        
      } catch (error) {
        console.error('Error sending message:', error);
        chatHistory.push({
          sender: 'clippy',
          message: 'Sorry, I\'m having trouble connecting right now. Please try again later.',
          timestamp: new Date()
        });
      } finally {
        isTyping = false;
        // Scroll to bottom after AI response
        setTimeout(scrollToBottom, 50);
      }
    }
    
    function handleKeyPress(event: KeyboardEvent) {
      if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        sendMessage();
      }
    }
</script>

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
      disabled={isTyping}
    />
    <button onclick={sendMessage} class="send-btn" disabled={isTyping}>Send</button>
  </div>
</div>

<style>
.chat-content {
  height: calc(100% - 8px); /* Reduce height to account for margin */
  margin-bottom: 8px; /* Add bottom margin */
  display: flex;
  flex-direction: column;
  background: white;
  font-family: 'MS Sans Serif', sans-serif;
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

  .input-field:disabled {
    background: #e0e0e0;
    color: #808080;
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

  .send-btn:disabled {
    background: #e0e0e0;
    color: #808080;
    cursor: not-allowed;
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

  @keyframes typing {
    0%, 60% { transform: translateY(0); }
    30% { transform: translateY(-8px); }
  }
</style>