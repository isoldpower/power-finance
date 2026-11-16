import { useMemo } from "react";
import { useShallow } from "zustand/react/shallow";

import { useGuestDemoSession } from "../session/index.ts";


interface GuestDemoEarlyEntry {
	available: boolean;
	enter: () => void;
}

function useGuestDemoEarlyEntry(): GuestDemoEarlyEntry {
	const { status, enteredEarly, enterEarly } = useGuestDemoSession(
		useShallow((state) => ({
			status: state.status,
			enteredEarly: state.enteredEarly,
			enterEarly: state.enterEarly,
		}))
	);

	return useMemo(() => ({
		available: status === 'browsable' && !enteredEarly,
		enter: enterEarly,
	}), [status, enteredEarly, enterEarly]);
}

export { useGuestDemoEarlyEntry };
export type { GuestDemoEarlyEntry };
