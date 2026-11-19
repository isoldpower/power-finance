import { use } from "react";

import { GuestDemoReactContext } from "./context.ts";

import type { GuestDemoContextValue } from "./types.ts";


function useGuestDemoContext(): GuestDemoContextValue {
	const context = use(GuestDemoReactContext);

	if (!context) {
		throw new Error('GuestDemoSessionProvider is missing. Guest demo hooks must be used within it');
	}

	return context;
}

export { useGuestDemoContext };
