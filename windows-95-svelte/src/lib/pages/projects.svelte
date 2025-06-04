<script lang="ts">
    // Props interface
    interface Props {
      // Add any props you might need
    }
    let {}: Props = $props();
  </script>
  
  <div class="page projects-page">
    <div class="page-content">
      <h2>Projects</h2>
      
      <div class="project-item">
        <h3>THIS WEBSITE</h3>
        <p class="subtitle">A react website in all its Win95 goodness</p>
        <a href="https://github.com/swstevens/internal-site">https://github.com/swstevens/internal-site</a>
        <p>
          My current portfolio website, inspired by another portfolio website by Henry Heffernan. Written in React, Javascript, and CSS. Hosted on Github Pages.
        </p>
      </div>
  
      <div class="project-item">
        <h3>PS1 SHADER</h3>
        <p class="subtitle">A recreation of ps1 era graphics in Godot</p>
        <a href="https://github.com/swstevens/Godot-and-Shaders">https://github.com/swstevens/Godot-and-Shaders</a>
        <p>
          A case study on how older generations of game consoles rendered graphics. While WIP, has functional rendering of vertex jittering texture warping. Written in Godot and GLSL.
        </p>
      </div>
  
      <div class="project-item">
        <h3>'23 WEBSITE</h3>
        <a href="https://github.com/swstevens/react-website">https://github.com/swstevens/react-website</a>
        <p>
          My previous website, a more traditional portfolio page. Also written in React, Javascript, and CSS. Hosted on Github Pages.
        </p>
      </div>
  
      <div class="project-item">
        <h3>ASCII GEN</h3>
        <p class="subtitle">A fun script that converts an image to an ascii render</p>
        <a href="https://github.com/swstevens/ascii-converter">https://github.com/swstevens/ascii-converter</a>
        <p>
          A tool that converts images into ASCII art representations using character mapping based on pixel intensity values.
        </p>
      </div>
  
      <div class="project-item">
        <h3>REST SITE</h3>
        <p class="subtitle">An iterative project to build a RESTful site using MongoDB</p>
        <a href="https://bitbucket.org/swstevens/">https://bitbucket.org/swstevens/</a>
        <p>
          A school project using Python and MongoDB that iteratively implemented RESTful practices into a fully complete website.
        </p>
      </div>
    </div>
  </div>
  
  <style>
    .page {
      display: flex;
      flex-direction: column;
      height: 100%;
      padding: 8px;
    }
  
    .page-content {
      flex: 1;
      overflow-y: auto;
      padding: 8px;
    }
  
    h2 {
      margin: 0 0 16px 0;
      color: #000;
      font-family: 'MS Sans Serif', sans-serif;
      font-size: 14px;
      font-weight: bold;
    }
  
    h3 {
      margin: 0 0 8px 0;
      color: #000;
      font-family: 'MS Sans Serif', sans-serif;
      font-size: 12px;
      font-weight: bold;
    }
  
    p {
      margin: 0 0 8px 0;
      font-size: 11px;
      line-height: 1.4;
    }
  
    .project-item {
      margin-bottom: 16px;
      padding-bottom: 12px;
      border-bottom: 2px solid #d0d0d0;
    }
  
    .project-item:last-child {
      border-bottom: none;
    }
  
    .subtitle {
      font-style: italic;
      color: #606060;
      margin-bottom: 4px;
    }
  
    a {
      color: #0000ee;
      text-decoration: underline;
      font-size: 11px;
      display: block;
      margin-bottom: 8px;
    }
  
    a:visited {
      color: #551a8b;
    }
  </style>