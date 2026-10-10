const DEMO_SESSION_PARAM = 'demo_session';
const DEMO_SESSION_STORAGE_KEY = 'finance:demo-session';


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

function captureDemoSession(): string | undefined {
	const fromUrl = new URLSearchParams(window.location.search)
		.get(DEMO_SESSION_PARAM);

	if (fromUrl === null || fromUrl === '') {
		return readStoredDemoSession();
	} else {
		storeDemoSession(fromUrl);
		return fromUrl;
	}
}

const demoSession = captureDemoSession();

const getDemoSession = (): string | undefined => demoSession;

export { getDemoSession };
