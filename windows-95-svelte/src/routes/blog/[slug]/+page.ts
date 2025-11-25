import { getBlogPosts, getPostBySlug } from '$lib/data/blog';
import { error } from '@sveltejs/kit';
import type { PageLoad, EntryGenerator } from './$types';

export const entries: EntryGenerator = () => {
	const posts = getBlogPosts();
	return posts.map(post => ({ slug: post.slug }));
};

export const load: PageLoad = ({ params }) => {
	const post = getPostBySlug(params.slug);

	if (!post) {
		throw error(404, 'Blog post not found');
	}

	return {
		post
	};
};
