import { useMemo } from "react";
import { useShallow } from "zustand/react/shallow";

import { useGuestDemoSession } from "./use-guest-demo-session.ts";


type GuestDemoTokenGetter = () => Promise<string>;

function useGuestDemoTokenGetter(): GuestDemoTokenGetter | null {
	const { demoSession, obtainSession } = useGuestDemoSession(
		useShallow((state) => ({
			demoSession: state.demoSession,
			obtainSession: state.obtainSession,
		}))
	);

	return useMemo(() => {
		if (demoSession === null) {
			return null;
		}

		return async () => (await obtainSession()).token;
	}, [demoSession, obtainSession]);
}

export { useGuestDemoTokenGetter };
export type { GuestDemoTokenGetter };
