<script lang="ts">
    // Props interface (if you need to pass any props to this component)
    interface Props {
      // Add any props you might need
    }
  
    let {}: Props = $props();
  
    // Reactive state for window width
    let windowWidth = $state(typeof window !== 'undefined' ? window.innerWidth : 0);
  
    // Update window width on resize
    function handleResize() {
      windowWidth = window.innerWidth;
    }
  
    // Add event listener for window resize
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);
    }
  </script>
  
  <svelte:window on:resize={handleResize} />
  
  <div class="home-content">
    <div class="image-section">
      <img 
        src="/headspin-square-unscreen.gif" 
        alt="my head" 
        class="headspin"
      />
    </div>
    <div class="info-section">
      <h1 class={windowWidth <= 480 ? "center-text" : ""}>SHEA STEVENS</h1>
      <div class="navigation">
        <a href="/" class="link">Home</a>
        <a href="/About" class="link">About</a>
        <a href="/Experience" class="link">Experience</a>
        <a href="/Projects" class="link">Projects</a>
      </div>
    </div>
  </div>
  
  <style>
    .home-content {
      display: flex;
      flex-direction: column;
      height: 100%;
      align-items: center;
      justify-content: center;
      padding: 16px;
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
      max-width: 120px;
      max-height: 120px;
      width: auto;
      height: auto;
    }
  
    .center-text {
      text-align: center;
    }
  
    h1 {
      margin: 0 0 20px 0;
      color: #000;
      font-family: 'MS Sans Serif', sans-serif;
      font-size: 18px;
      font-weight: bold;
    }
  
    .navigation {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 8px;
    }
  
    .link {
      color: blue;
      cursor: pointer;
      padding: 4px 8px;
      text-decoration: underline;
      font-family: 'MS Sans Serif', sans-serif;
      font-size: 11px;
    }
  
    .link:hover {
      text-decoration: none;
      background: #e0e0e0;
    }
  
    .link:visited {
      color: purple;
    }
  
    /* Mobile adjustments */
    @media (max-width: 480px) {
      .home-content {
        flex-direction: column;
      }
      
      .navigation {
        flex-direction: column;
        align-items: center;
      }
      
      .link {
        margin: 2px 0;
      }
    }
  </style>