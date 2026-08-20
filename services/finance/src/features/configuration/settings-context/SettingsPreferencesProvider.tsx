import { useState } from "react";

import { createSettingsPreferencesStore } from "./settings-store.ts";
import { SettingsPreferencesReactContext } from "./context.ts";

import type { FC, PropsWithChildren } from "react";
import type { SettingsPreferences } from "./types.ts";


type SettingsPreferencesProviderProps = PropsWithChildren<Partial<SettingsPreferences>>;

const SettingsPreferencesProvider: FC<SettingsPreferencesProviderProps> = ({
	children,
	...initialValue
}) => {
	const [zustandStore] = useState(() => {
		return createSettingsPreferencesStore(initialValue);
	});

	return (
		<SettingsPreferencesReactContext value={zustandStore}>
			{children}
		</SettingsPreferencesReactContext>
	);
}

export { SettingsPreferencesProvider };
