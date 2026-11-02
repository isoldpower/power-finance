import { useShallow } from "zustand/react/shallow";

import { useGuestDemoSession } from "../guest-demo-session";


type GuestDemoModePhase = 'inactive' | 'demo' | 'indexing' | 'indexed';

function useGuestDemoMode(): GuestDemoModePhase {
	const { demoSession, status, enteredEarly } = useGuestDemoSession(
		useShallow((state) => ({
			demoSession: state.demoSession,
			status: state.status,
			enteredEarly: state.enteredEarly,
		}))
	);

	if (demoSession === null) {
		return 'inactive';
	}
	if (!enteredEarly) {
		return 'demo';
	}

	return status === 'ready' ? 'indexed' : 'indexing';
}

export { useGuestDemoMode };
export type { GuestDemoModePhase };
