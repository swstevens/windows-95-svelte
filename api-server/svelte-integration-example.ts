// Example integration for your Svelte frontend
// This replaces src/lib/supabase.ts when using the Go API instead of Supabase

import { browser } from '$app/environment';

// Your Raspberry Pi API URL (set in .env file)
const API_URL = browser ? import.meta.env.VITE_API_URL : '';
// Example: http://your-domain.com:8080 or http://123.456.789.0:8080

export interface GuestbookEntry {
	id?: number;
	name: string;
	message: string;
	date: string;
	created_at?: string;
}

export interface VisitorCount {
	id: number;
	count: number;
}

async function apiFetch<T>(
	endpoint: string,
	options: {
		method?: string;
		body?: any;
	} = {}
): Promise<T> {
	if (!browser || !API_URL) {
		throw new Error('API not configured');
	}

	const { method = 'GET', body } = options;

	const url = `${API_URL}${endpoint}`;

	const headers: HeadersInit = {
		'Content-Type': 'application/json',
	};

	const response = await fetch(url, {
		method,
		headers,
		body: body ? JSON.stringify(body) : undefined,
	});

	if (!response.ok) {
		throw new Error(`API error: ${response.statusText}`);
	}

	return response.json();
}

// Get all guestbook entries
export async function getGuestbookEntries(): Promise<GuestbookEntry[]> {
	try {
		return await apiFetch<GuestbookEntry[]>('/guestbook');
	} catch (error) {
		console.error('Failed to fetch guestbook entries:', error);
		return [];
	}
}

// Add a new guestbook entry
export async function addGuestbookEntry(name: string, message: string): Promise<GuestbookEntry | null> {
	try {
		return await apiFetch<GuestbookEntry>('/guestbook', {
			method: 'POST',
			body: { name, message },
		});
	} catch (error) {
		console.error('Failed to add guestbook entry:', error);
		return null;
	}
}

// Get visitor count
export async function getVisitorCount(): Promise<number> {
	try {
		const result = await apiFetch<VisitorCount>('/visitor-count');
		return result.count || 1337;
	} catch (error) {
		console.error('Failed to fetch visitor count:', error);
		return 1337;
	}
}

// To use this in your Svelte project:
// 1. Replace the contents of src/lib/supabase.ts with this file
// 2. Add VITE_API_URL to your .env file:
//    VITE_API_URL=http://your-raspberry-pi-ip:8080
// 3. Add VITE_API_URL to your GitHub Secrets for deployment
// 4. Update .github/workflows/deploy.yml to include VITE_API_URL in env
