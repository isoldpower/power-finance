import { readStoredDemoSession, storeDemoSession } from "../demo-session-storage.ts";

import type { DemoSession } from "../types.ts";
import type { IDemoSessionsRESTApiClient } from "./types.ts";


let pendingIssue: Promise<DemoSession> | null = null;

async function issueDemoSession(client: IDemoSessionsRESTApiClient): Promise<DemoSession> {
	const envelope = await client.issue();
	const session = { id: envelope.data.id, expiresAt: envelope.data.expires_at };

	storeDemoSession(session);

	return session;
}

function obtainDemoSession(client: IDemoSessionsRESTApiClient): Promise<DemoSession> {
	const stored = readStoredDemoSession(Date.now());

	if (stored) {
		return Promise.resolve(stored);
	}

	pendingIssue ??= issueDemoSession(client).finally(() => {
		pendingIssue = null;
	});

	return pendingIssue;
}

export { obtainDemoSession };
