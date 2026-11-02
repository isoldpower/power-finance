import { useState } from "react";

import { createGuestDemoSessionStore } from "./session-store.ts";
import { GuestDemoSessionReactContext } from "./context.ts";

import type { FC, PropsWithChildren } from "react";
import type { GuestDemoSessionStoreOptions } from "./session-store.ts";


type GuestDemoSessionProviderProps = PropsWithChildren<GuestDemoSessionStoreOptions>;

const GuestDemoSessionProvider: FC<GuestDemoSessionProviderProps> = ({
	children,
	demoSession,
	client,
}) => {
	const [zustandStore] = useState(() => {
		return createGuestDemoSessionStore({ demoSession, client });
	});

	return (
		<GuestDemoSessionReactContext value={zustandStore}>
			{children}
		</GuestDemoSessionReactContext>
	);
};

GuestDemoSessionProvider.displayName = 'GuestDemoSessionProvider';

export { GuestDemoSessionProvider };
export type { GuestDemoSessionProviderProps };
