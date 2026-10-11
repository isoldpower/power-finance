const DEMO_SESSION_PARAM = 'demo_session';
const DEMO_SESSION_STORAGE_KEY = 'power-finance:demo-session';

let capturedDemoSession: string | undefined;


function readStoredDemoSession(): string | undefined {
	try {
		return sessionStorage.getItem(DEMO_SESSION_STORAGE_KEY) ?? undefined;
	} catch {
		return undefined;
	}
}

function storeDemoSession(demoSession: string): void {
	try {
		sessionStorage.setItem(DEMO_SESSION_STORAGE_KEY, demoSession);
	} catch {
		return;
	}
}

function readDemoSessionFromUrl(): string | undefined {
	const fromUrl = new URLSearchParams(window.location.search).get(DEMO_SESSION_PARAM);

	return fromUrl === null || fromUrl === '' ? undefined : fromUrl;
}

function captureDemoSession(): string | undefined {
	const fromUrl = readDemoSessionFromUrl();

	if (fromUrl !== undefined) {
		storeDemoSession(fromUrl);
		capturedDemoSession = fromUrl;
	} else {
		capturedDemoSession ??= readStoredDemoSession();
	}

	return capturedDemoSession;
}

function getDemoSession(): string | undefined {
	return capturedDemoSession ?? readStoredDemoSession();
}

function forgetDemoSession(): void {
	capturedDemoSession = undefined;
	try {
		sessionStorage.removeItem(DEMO_SESSION_STORAGE_KEY);
	} catch {
		return;
	}
}

export { captureDemoSession, forgetDemoSession, getDemoSession, DEMO_SESSION_PARAM };
