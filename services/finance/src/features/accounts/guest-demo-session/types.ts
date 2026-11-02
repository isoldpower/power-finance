import type { GuestDemoSession } from "@entity/accounts";

type GuestDemoPreparationStatus = 'preparing' | 'browsable' | 'ready';

interface GuestDemoSessionSnapshot {
	session: GuestDemoSession | null;
}

interface GuestDemoSessionState extends GuestDemoSessionSnapshot {
	demoSession: string | null;
	status: GuestDemoPreparationStatus;
	enteredEarly: boolean;
	pendingSession: Promise<GuestDemoSession> | null;
	obtainSession: () => Promise<GuestDemoSession>;
	advancePreparation: (status: GuestDemoPreparationStatus) => void;
	enterEarly: () => void;
}

export type { GuestDemoPreparationStatus, GuestDemoSessionSnapshot, GuestDemoSessionState };
