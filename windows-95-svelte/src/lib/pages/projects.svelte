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
        <h3>AGENTIC CAG SYSTEM</h3>
        <p class="subtitle">An intelligent system combining agentic AI with context-aware generation</p>
        <a href="https://github.com/swstevens/agentic-cag-system">https://github.com/swstevens/agentic-cag-system</a>
        <p>
          An advanced system that leverages agentic AI architectures with context-aware generation techniques. Demonstrates modern AI system design patterns and autonomous agent coordination.
        </p>
      </div>

      <div class="project-item">
        <h3>RAG CHATBOT (GO)</h3>
        <p class="subtitle">A retrieval-augmented generation chatbot built with Go</p>
        <a href="https://github.com/swstevens/rag-chatbot-go">https://github.com/swstevens/rag-chatbot-go</a>
        <p>
          A high-performance RAG chatbot implementation written in Go. Combines retrieval-augmented generation techniques for intelligent context-aware responses. Showcases Go's efficiency and concurrency features.
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
      padding: 12px;
      max-width: 900px;
      margin: 0 auto;
      width: 100%;
    }

    h2 {
      margin: 0 0 12px 0;
      color: #000;
      font-family: 'Orbitron', 'MS Sans Serif', sans-serif;
      letter-spacing: 1px;
      font-size: 16px;
      font-weight: bold;
    }

    h3 {
      margin: 10px 0 4px 0;
      color: #000;
      font-family: 'Orbitron', 'MS Sans Serif', sans-serif;
      letter-spacing: 1px;
      font-size: 13px;
      font-weight: bold;
    }

    p {
      font-family: "Open Sans", sans-serif;
      font-weight: 500;
      margin: 0 0 6px 0;
      font-size: 11px;
      line-height: 1.5;
    }

    .project-item {
      margin-bottom: 12px;
      padding-bottom: 12px;
      border-bottom: 2px solid #d0d0d0;
    }

    .project-item:last-child {
      border-bottom: none;
    }

    .subtitle {
      font-family: "Open Sans", sans-serif;
      font-style: italic;
      color: #606060;
      margin-bottom: 4px;
      font-size: 10px;
    }

    a {
      font-family: "Open Sans", sans-serif;
      color: #0000ee;
      text-decoration: underline;
      font-size: 11px;
      display: block;
      margin-bottom: 6px;
      word-break: break-all;
    }

    a:visited {
      color: #551a8b;
    }

    @media (max-width: 600px) {
      .page-content {
        padding: 8px;
      }

      h2 {
        font-size: 14px;
        margin: 0 0 10px 0;
      }

      h3 {
        font-size: 12px;
        margin: 8px 0 4px 0;
      }

      p {
        font-size: 10px;
        line-height: 1.4;
      }

      a {
        font-size: 10px;
        margin-bottom: 4px;
      }

      .project-item {
        margin-bottom: 10px;
        padding-bottom: 10px;
      }
    }
  </style>