import { useStore } from "zustand";

import { useGuestDemoContext } from "./use-guest-demo-context.ts";

import type { GuestDemoSessionState } from "./types.ts";


function useGuestDemoSession<T>(selector: (state: GuestDemoSessionState) => T): T {
	return useStore(useGuestDemoContext().store, selector);
}

export { useGuestDemoSession };
