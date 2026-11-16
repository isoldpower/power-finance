type GuestDemoApiMode = 'mock' | 'live';

type GuestDemoPreparationStatus = 'preparing' | 'browsable' | 'ready';

type GuestDemoModePhase = 'inactive' | 'demo' | 'indexing' | 'indexed';

interface GuestDemoSession {
	token: string;
	expiresAt: string;
	writeVersion: string | null;
}

export type { GuestDemoApiMode, GuestDemoModePhase, GuestDemoPreparationStatus, GuestDemoSession };
