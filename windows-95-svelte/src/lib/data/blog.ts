export interface BlogPost {
	id: string;
	title: string;
	slug: string;
	date: string;
	excerpt: string;
	content: string;
}

// Import all blog posts from the blog-posts directory
const blogPostModules = import.meta.glob<{ default: BlogPost }>(
	'./blog-posts/*.json',
	{ eager: true }
);

// Load and sort blog posts
function loadBlogPosts(): BlogPost[] {
	const posts: BlogPost[] = Object.values(blogPostModules).map(
		(module) => module.default
	);

	// Sort by date descending (newest first)
	// Date format: YYYY-MM-DD in filename
	return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

// Cache posts to avoid re-sorting on every access
const cachedPosts = loadBlogPosts();

export function getBlogPosts(): BlogPost[] {
	return cachedPosts;
}

export function getPostById(id: string): BlogPost | undefined {
	return cachedPosts.find((post) => post.id === id);
}

export function getPostBySlug(slug: string): BlogPost | undefined {
	return cachedPosts.find((post) => post.slug === slug);
}
