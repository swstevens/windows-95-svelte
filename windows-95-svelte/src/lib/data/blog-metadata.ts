export interface GuestbookEntry {
	name: string;
	message: string;
	date: string;
}

// Import visitor count
import visitorCountData from './blog-data/visitor-count.json';

// Import guestbook entries
import guestbookData from './blog-data/guestbook.json';

export function getVisitorCount(): number {
	return visitorCountData.count;
}

export function getGuestbookEntries(): GuestbookEntry[] {
	return guestbookData as GuestbookEntry[];
}
