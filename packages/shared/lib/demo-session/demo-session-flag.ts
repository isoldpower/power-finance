import {
	DEMO_SESSION_DISABLED_VALUES,
	DEMO_SESSION_PARAM,
	DEMO_SESSION_REQUESTED_STORAGE_KEY,
} from "./config.ts";
import { forgetStoredDemoSession } from "./demo-session-storage.ts";


let capturedRequest: boolean | undefined;

function readFlagFromUrl(): boolean | undefined {
	const value = new URLSearchParams(window.location.search).get(DEMO_SESSION_PARAM);

	if (value === null) {
		return undefined;
	}

	return !DEMO_SESSION_DISABLED_VALUES.includes(value.toLowerCase());
}

function readStoredRequest(): boolean {
	try {
		return sessionStorage.getItem(DEMO_SESSION_REQUESTED_STORAGE_KEY) === 'true';
	} catch {
		return false;
	}
}

function storeRequest(): void {
	try {
		sessionStorage.setItem(DEMO_SESSION_REQUESTED_STORAGE_KEY, 'true');
	} catch {
		return;
	}
}

function forgetDemoSession(): void {
	capturedRequest = undefined;
	forgetStoredDemoSession();

	try {
		sessionStorage.removeItem(DEMO_SESSION_REQUESTED_STORAGE_KEY);
	} catch {
		return;
	}
}

function captureDemoSession(): boolean {
	const fromUrl = readFlagFromUrl();

	if (fromUrl === true) {
		storeRequest();
		capturedRequest = true;
	} else if (fromUrl === false) {
		forgetDemoSession();
		capturedRequest = false;
	} else {
		capturedRequest ??= readStoredRequest();
	}

	return capturedRequest;
}

function isDemoSessionRequested(): boolean {
	return capturedRequest ?? readStoredRequest();
}

export { captureDemoSession, forgetDemoSession, isDemoSessionRequested };
