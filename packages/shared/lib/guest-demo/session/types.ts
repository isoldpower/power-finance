import type { StoreApi } from "zustand";
import type { GuestDemoPreparationStatus, GuestDemoSession } from "../types.ts";
import type { IGuestDemoReadinessRESTApiClient } from "../api/index.ts";


interface GuestDemoSessionSnapshot {
	session: GuestDemoSession | null;
}

interface GuestDemoSessionState extends GuestDemoSessionSnapshot {
	demoSession: string | null;
	status: GuestDemoPreparationStatus;
	enteredEarly: boolean;
	preparationFailed: boolean;
	pendingSession: Promise<GuestDemoSession> | null;
	obtainSession: () => Promise<GuestDemoSession>;
	advancePreparation: (status: GuestDemoPreparationStatus) => void;
	enterEarly: () => void;
	failPreparation: () => void;
	retryPreparation: () => void;
}

interface GuestDemoContextValue {
	store: StoreApi<GuestDemoSessionState>;
	readiness: IGuestDemoReadinessRESTApiClient;
	isGuestVisit: boolean;
}

export type { GuestDemoContextValue, GuestDemoSessionSnapshot, GuestDemoSessionState };
