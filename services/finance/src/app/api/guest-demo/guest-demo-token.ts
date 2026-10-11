import { DEMO_SESSION_HEADER } from "@internal/shared";
import { GUEST_DEMO_TOKEN_STORAGE_KEY, TOKEN_RENEWAL_MARGIN_MS } from "./config";


interface StoredGuestDemoToken {
	token: string;
	expiresAt: string;
}

interface GuestDemoSessionResponse {
	data: {
		token: string;
		expires_at: string;
	};
}

let pendingGuestDemoToken: Promise<string> | null = null;
let inMemoryGuestDemoToken: StoredGuestDemoToken | null = null;

function readStoredGuestDemoToken(): StoredGuestDemoToken | null {
	try {
		const storedValue = sessionStorage.getItem(GUEST_DEMO_TOKEN_STORAGE_KEY);

		return storedValue 
			? JSON.parse(storedValue) as StoredGuestDemoToken 
			: inMemoryGuestDemoToken;
	} catch {
		return inMemoryGuestDemoToken;
	}
}

function storeGuestDemoToken(guestDemoToken: StoredGuestDemoToken): void {
	inMemoryGuestDemoToken = guestDemoToken;
	try {
		sessionStorage.setItem(
			GUEST_DEMO_TOKEN_STORAGE_KEY,
			JSON.stringify(guestDemoToken)
		);
	} catch {
		return;
	}
}

function isUsableUntilRenewal(guestDemoToken: StoredGuestDemoToken, now: number): boolean {
	return Date.parse(guestDemoToken.expiresAt) - TOKEN_RENEWAL_MARGIN_MS > now;
}

async function requestGuestDemoToken(
	sessionsUrl: string,
	demoSession: string
): Promise<StoredGuestDemoToken> {
	const response = await fetch(sessionsUrl, {
		method: 'POST',
		headers: { [DEMO_SESSION_HEADER]: demoSession },
	});

	if (!response.ok) {
		throw new Error(
			`Guest demo session could not be started (HTTP ${response.status.toString()})`
		);
	}

	const responseBody = await response.json() as GuestDemoSessionResponse;

	return {
		token: responseBody.data.token,
		expiresAt: responseBody.data.expires_at,
	};
}

function obtainGuestDemoToken(sessionsUrl: string, demoSession: string): Promise<string> {
	const storedGuestDemoToken = readStoredGuestDemoToken();
	if (storedGuestDemoToken && isUsableUntilRenewal(storedGuestDemoToken, Date.now())) {
		return Promise.resolve(storedGuestDemoToken.token);
	}

	pendingGuestDemoToken ??= requestGuestDemoToken(sessionsUrl, demoSession)
		.then((guestDemoToken) => {
			storeGuestDemoToken(guestDemoToken);
			return guestDemoToken.token;
		})
		.finally(() => {
			pendingGuestDemoToken = null;
		});

	return pendingGuestDemoToken;
}

function forgetGuestDemoToken(): void {
	inMemoryGuestDemoToken = null;
	pendingGuestDemoToken = null;
	try {
		sessionStorage.removeItem(GUEST_DEMO_TOKEN_STORAGE_KEY);
	} catch {
		return;
	}
}

export { forgetGuestDemoToken, obtainGuestDemoToken };
export type { StoredGuestDemoToken };
