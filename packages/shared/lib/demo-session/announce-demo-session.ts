import { DEMO_SESSION_MESSAGE_TYPE } from "./config.ts";


function parentOrigin(): string | null {
	const ancestors = window.location.ancestorOrigins as DOMStringList | undefined;
	const ancestor = ancestors?.item(0);

	if (ancestor) {
		return ancestor;
	}

	try {
		return document.referrer === '' ? null : new URL(document.referrer).origin;
	} catch {
		return null;
	}
}

function announceDemoSession(id: string): void {
	if (window.parent === window) {
		return;
	}

	const targetOrigin = parentOrigin();

	if (targetOrigin === null) {
		return;
	}

	window.parent.postMessage({ type: DEMO_SESSION_MESSAGE_TYPE, demoSession: id }, targetOrigin);
}

export { announceDemoSession };
