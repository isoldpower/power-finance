import { use } from "react";
import { useStore } from "zustand";

import { GuestDemoSessionReactContext } from "./context.ts";

import type { GuestDemoSessionState } from "./types.ts";


function useGuestDemoSession<T>(selector: (state: GuestDemoSessionState) => T) {
	const context = use(GuestDemoSessionReactContext);

	if (!context) {
		throw new Error(
			'GuestDemoSessionReactContext.Provider is missing. ' +
			'useGuestDemoSession<T> must be used within the guest demo session'
		);
	}

	return useStore(context, selector);
}

export { useGuestDemoSession };
