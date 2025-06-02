<script>
    // Props for customization
    let {
      scanWidth = 2,
      scanColor = 'rgba(105, 105, 105, 0.253)',
      scanOpacity = 0.75,
      scanlineSpeed = 6,
      scanlinesSpeed = 3,
      zIndex = 2147483648,
      class: className = '',
      ...restProps
    } = $props();
    
    // Generate CSS custom properties using derived state
    const cssVars = $derived({
      '--scan-width': `${scanWidth}px`,
      '--scan-color': scanColor,
      '--scan-z-index': zIndex,
      '--scan-opacity': scanOpacity,
      '--scanline-speed': `${scanlineSpeed}s`,
      '--scanlines-speed': `${scanlinesSpeed}s`
    });
  </script>
  
  <div 
    class="scanlines {className}" 
    style={Object.entries(cssVars).map(([key, value]) => `${key}: ${value}`).join('; ')}
    {...restProps}
  >
    <slot />
  </div>
  
  <style>
    .scanlines {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      pointer-events: none;
      z-index: var(--scan-z-index);
    }
    
    /* Moving scanline effect */
    .scanlines:before {
      display: block;
      pointer-events: none;
      content: '';
      position: absolute;
      bottom: 100%;
      width: 100%;
      height: calc(var(--scan-width) * 1);
      z-index: calc(var(--scan-z-index) + 1);
      background: var(--scan-color);
      opacity: var(--scan-opacity);
      animation: scanline var(--scanline-speed, 6s) linear infinite;
    }
    
    /* Static scanlines pattern */
    .scanlines:after {
      display: block;
      pointer-events: none;
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: var(--scan-z-index);
      background: linear-gradient(
        to bottom,
        transparent 50%,
        var(--scan-color) 51%
      );
      background-size: 100% calc(var(--scan-width) * 2);
      animation: scanlines var(--scanlines-speed, 3s) steps(60) infinite;
    }
    
    /* Keyframes for moving scanline */
    @keyframes scanline {
      0% {
        transform: translate3d(0, 200000%, 0);
      }
    }
    
    /* Keyframes for static scanlines pattern */
    @keyframes scanlines {
      0% {
        background-position: 0 50%;
      }
    }
  </style>