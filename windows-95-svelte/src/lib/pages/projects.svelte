<script lang="ts">
	import '../styles/theme.css';

	// Props interface
	interface Props {
		// Add any props you might need
	}
	let {}: Props = $props();
</script>

<div class="themed-page projects-page">
	<div class="themed-page-content">
		<h2>Projects</h2>

		<div class="themed-card project-item">
			<h3>LIGHTWEIGHT AI IMAGE DETECTION</h3>
			<p class="subtitle">
				Comparing a CNN and a vision transformer for AI-generated image detection under consumer-scale constraints
			</p>
			<a href="https://github.com/ics-professional-program/ics605-sp26-final-project-swstevens"
				>https://github.com/ics-professional-program/ics605-sp26-final-project-swstevens</a
			>
			<p>
				Fine-tuned EfficientNet-B0 and DeiT-Tiny to detect AI-generated images across unseen
				generators on a single consumer GPU, then stress-tested both against commercial generators
				entirely unseen during training. Includes a Grad-CAM interpretability analysis and ships
				both models as an on-device Firefox extension via ONNX Runtime Web.
			</p>
		</div>

		<div class="themed-card project-item">
			<h3>DEADLOCK COUNTER ITEM EFFECTIVENESS STUDY</h3>
			<p class="subtitle">
				Statistical testing of whether community-consensus counter items actually move win rate
			</p>
			<a href="https://github.com/swstevens/604-Final-Deadlock-Item-Effectiveness-Study"
				>https://github.com/swstevens/604-Final-Deadlock-Item-Effectiveness-Study</a
			>
			<p>
				Applied chi-square tests and relative lift analysis to five community-consensus counter
				item pairings in Valve's Deadlock, using match data across two rank bands. Found that
				counter item effectiveness is rank-dependent and far from universal, challenging common
				player assumptions.
			</p>
		</div>

		<div class="themed-card project-item">
			<h3>OPENGL GRAPHICS ENGINE (COMMON LISP)</h3>
			<p class="subtitle">
				A 2D/3D graphics engine with hierarchical scene graphs and forward kinematics
			</p>
			<a href="https://github.com/swstevens/ICS481-Graphics-Implementations"
				>https://github.com/swstevens/ICS481-Graphics-Implementations</a
			>
			<p>
				A comprehensive graphics engine built using OpenGL bindings in Common Lisp. Features
				hierarchical node structures for scene management, enabling complex 2D and 3D scene
				composition. Implements forward kinematics for articulated object animation and
				transformation chains. Demonstrates low-level graphics programming and functional
				programming paradigms in a systems context.
			</p>
		</div>

		<div class="themed-card project-item">
			<h3>AGENTIC CAG SYSTEM</h3>
			<p class="subtitle">
				An intelligent system combining agentic AI with context-aware generation
			</p>
			<a href="https://github.com/swstevens/agentic-cag-system"
				>https://github.com/swstevens/agentic-cag-system</a
			>
			<p>
				An advanced system that leverages agentic AI architectures with context-aware generation
				techniques. Demonstrates modern AI system design patterns and autonomous agent coordination.
			</p>
		</div>

		<div class="themed-card project-item">
			<h3>RAG CHATBOT (GO)</h3>
			<p class="subtitle">A retrieval-augmented generation chatbot built with Go</p>
			<a href="https://github.com/swstevens/rag-chatbot-go"
				>https://github.com/swstevens/rag-chatbot-go</a
			>
			<p>
				A high-performance RAG chatbot implementation written in Go. Combines retrieval-augmented
				generation techniques for intelligent context-aware responses. Showcases Go's efficiency and
				concurrency features.
			</p>
		</div>

		<div class="themed-card project-item">
			<h3>'23 WEBSITE</h3>
			<a href="https://github.com/swstevens/react-website"
				>https://github.com/swstevens/react-website</a
			>
			<p>
				My previous website, a more traditional portfolio page. Also written in React, Javascript,
				and CSS. Hosted on Github Pages.
			</p>
		</div>

		<div class="themed-card project-item">
			<h3>ASCII GEN</h3>
			<p class="subtitle">A fun script that converts an image to an ascii render</p>
			<a href="https://github.com/swstevens/ascii-converter"
				>https://github.com/swstevens/ascii-converter</a
			>
			<p>
				A tool that converts images into ASCII art representations using character mapping based on
				pixel intensity values.
			</p>
		</div>

		<div class="themed-card project-item">
			<h3>REST SITE</h3>
			<p class="subtitle">An iterative project to build a RESTful site using MongoDB</p>
			<a href="https://bitbucket.org/swstevens/">https://bitbucket.org/swstevens/</a>
			<p>
				A school project using Python and MongoDB that iteratively implemented RESTful practices
				into a fully complete website.
			</p>
		</div>
	</div>
</div>

<style>
	/* Page-specific customizations */
	.project-item {
		cursor: default;
	}

	.project-item:hover {
		cursor: default;
		padding-left: 14px;
	}

	.subtitle {
		font-style: italic;
		color: var(--secondary);
		margin-bottom: 6px;
		font-size: 11px;
		font-weight: 600;
	}

	.project-item a {
		display: block;
		margin-bottom: 8px;
		word-break: break-all;
	}
</style>
