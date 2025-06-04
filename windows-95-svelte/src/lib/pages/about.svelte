<script lang="ts">
	// Props interface
	interface Props {
		// Add any props you might need
	}

	let {}: Props = $props();
</script>

<div class="page about-page">
	<div class="page-content">
		<h2>WELCOME</h2>
		<h3>I'm Shea Stevens</h3>
		
		<div class="text-block">
			<p>
				I'm a full stack software engineer looking for employment! I was born and raised in Hawaii, and in 2021 I graduated from 
				the University of Oregon
				with my BS in Computer Science. Minors in Mathematics and Japanese. 
			</p>
			<p>
				Thank you for taking the time to check out my portfolio. I
				really hope you enjoy exploring it as much as I enjoyed
				building it. If you have any questions or comments, feel
				free to contact me using{' '}
				<a href="mailto:sstevensw@gmail.com">
					sstevensw@gmail.com
				</a>
			</p>
			
			<div class="resume-container">
				<div class="resume-container-text">
					<h3>Looking for my resume?</h3>
					<a rel="noreferrer" target="_blank" href="/Shea_Stevens_Res.pdf" download>
						<p>Click here to download it!</p>
					</a>
				</div>
			</div>
		</div>
		
		<div class="text-block">
			<h3>About Me</h3>
			<p>
				I've always been an avid tinkerer. From laptops to VCR's to robotics, my childhood was filled with taking things apart and seeing how they work. These days, I'm a coder. I love to do back end work, setting up the connections between all of the different systems in an environment. Whether it's a large monolith, or a swift microservice system, I'm always at home working through additions and optimizations.
			</p>
			<p>
				Most of my experience lies in coding backend API's, but I'm rapidly building skills to work as a Full Stack Developer. By far, I used Python the most. It may not be the fastest language out there, but its lenient syntax let's you spin a small project up the fastest. When speed is a priority, I like to use C# or C++. And of course, I've got all those algorithm skills that they teach you in university too (Djikstra eat your heart out).
			</p>
			<p>
				My passion for programming also comes from the love of video games, which have shaped a lot of who I am today. When I would pick up my controller and be amazed by what could be created through code, I knew deep down that this was my path in life. That early era of janky, low poly models is something that I hold dear to my heart, and something that I replicate in my own personal projects. It helps that you don't need a super large team like newer releases, either.
			</p>
			
			<div class="hobbies-section">
				<div class="hobbies-text">
					<h3>My Hobbies</h3>
					<p>
						Outside of programming, I've got quite a few hobbies. Film photography is one. Nothing beats the physical mediums in my opinion, and the imperfections that come with film. You can check out some of my photographs here:
					</p>
					<p>
						My personal projects tend to include some form of retro game. Recently, I've really liked the Godot Engine, due to it's open source and free nature. After the debacle with Unity licensing, I've seen a lot of indie devs move there as well. Probably the most interesting thing about it is the language it uses, aptly named Godot, which is it's own fork of C#. Perfect for those smaller teams looking to build a retro labor of love.
					</p>
					<p>
						And believe it or not, I'm quite a cook. While recipes can be quite formulaic, I try to keep my instincts in mind in the kitchen. Learn enough about the ingredients you cook with and you can come up with something pretty unique based on what's in your fridge. 
					</p>
				</div>
			</div>
			
			<p>
				If you have any questions or comments I would love to hear
				them. You can reach me at{' '}
				<a href="mailto:sstevensw@gmail.com">
					sstevensw@gmail.com
				</a>
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

	p {
		margin: 0 0 8px 0;
		font-size: 11px;
		line-height: 1.4;
	}

	.text-block {
		margin-bottom: 16px;
	}

	.resume-container {
		display: flex;
		align-items: center;
		padding: 8px;
		border: 2px solid #000;
		border-left: 0;
		border-right: 0;
		margin: 8px 0;
	}
    
	.resume-container-text h3 {
		margin: 0 0 4px 0;
	}

	.resume-container-text p {
		margin: 0;
	}

	.hobbies-section {
		margin: 16px 0;
	}

	.hobbies-text {
		text-align: justify;
	}

	a {
		color: #0000ff;
		text-decoration: underline;
	}

	a:hover {
		color: #ff0000;
	}
</style>