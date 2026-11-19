interface DemoSession {
	id: string;
	expiresAt: string;
}

type DemoSessionStatus = 'inactive' | 'issuing' | 'ready' | 'failed';

export type { DemoSession, DemoSessionStatus };
