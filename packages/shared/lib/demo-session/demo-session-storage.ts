import { DEMO_SESSION_RENEWAL_MARGIN_MS, DEMO_SESSION_STORAGE_KEY } from "./config.ts";

import type { DemoSession } from "./types.ts";


function isDemoSession(candidate: unknown): candidate is DemoSession {
	if (typeof candidate !== 'object' || candidate === null) {
		return false;
	}

	const { id, expiresAt } = candidate as Partial<DemoSession>;

	return typeof id === 'string' && typeof expiresAt === 'string';
}

function isUsableDemoSession(session: DemoSession, now: number): boolean {
	const expiresAt = Date.parse(session.expiresAt);

	return expiresAt - DEMO_SESSION_RENEWAL_MARGIN_MS > now;
}

function readStoredDemoSession(now: number): DemoSession | null {
	try {
		const raw = sessionStorage.getItem(DEMO_SESSION_STORAGE_KEY);
		const parsed: unknown = raw === null ? null : JSON.parse(raw);

		return isDemoSession(parsed) && isUsableDemoSession(parsed, now) ? parsed : null;
	} catch {
		return null;
	}
}

function storeDemoSession(session: DemoSession): void {
	try {
		sessionStorage.setItem(DEMO_SESSION_STORAGE_KEY, JSON.stringify(session));
	} catch {
		return;
	}
}

function forgetStoredDemoSession(): void {
	try {
		sessionStorage.removeItem(DEMO_SESSION_STORAGE_KEY);
	} catch {
		return;
	}
}

export { forgetStoredDemoSession, readStoredDemoSession, storeDemoSession };
