import { browser } from '$app/environment';

// Go API URL (dev: localhost:8080, prod: your Raspberry Pi)
const API_URL = browser ? import.meta.env.VITE_API_URL : '';

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
