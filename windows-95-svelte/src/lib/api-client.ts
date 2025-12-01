// API client for the Go backend server
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

export interface GuestbookEntry {
    id: number;
    name: string;
    message: string;
    date: string;
    created_at: string;
}

export interface VisitorCount {
    id: number;
    count: number;
}

/**
 * Fetch the current visitor count and increment it
 */
export async function getVisitorCount(): Promise<number> {
    try {
        const response = await fetch(`${API_URL}/visitor-count`);
        if (!response.ok) {
            throw new Error('Failed to fetch visitor count');
        }
        const data: VisitorCount = await response.json();
        return data.count;
    } catch (error) {
        console.error('Error fetching visitor count:', error);
        return 1337; // Fallback value
    }
}

/**
 * Fetch all guestbook entries
 */
export async function getGuestbookEntries(): Promise<GuestbookEntry[]> {
    try {
        const response = await fetch(`${API_URL}/guestbook`);
        if (!response.ok) {
            throw new Error('Failed to fetch guestbook entries');
        }
        const data: GuestbookEntry[] = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching guestbook entries:', error);
        return [];
    }
}

/**
 * Add a new guestbook entry
 */
export async function addGuestbookEntry(
    name: string,
    message: string
): Promise<GuestbookEntry | null> {
    try {
        const response = await fetch(`${API_URL}/guestbook`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, message })
        });

        if (!response.ok) {
            throw new Error('Failed to add guestbook entry');
        }

        const data: GuestbookEntry = await response.json();
        return data;
    } catch (error) {
        console.error('Error adding guestbook entry:', error);
        return null;
    }
}
