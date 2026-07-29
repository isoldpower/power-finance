import { useMemo } from "react";

import type { FC, PropsWithChildren } from "react";
import type { MetricsPreferences } from "./types.ts";

import { createMetricsSettingsStore } from "./settings-store.ts";
import { MetricsPreferencesReactContext } from "./context.ts";


type MetricsPreferencesProviderProps = PropsWithChildren<Partial<MetricsPreferences>>;

const MetricsPreferencesProvider: FC<MetricsPreferencesProviderProps> = ({
	children,
	...initialValue
}) => {
	const zustandStore = useMemo(() => {
		return createMetricsSettingsStore(initialValue);
	}, [initialValue]);
	
	return (
		<MetricsPreferencesReactContext value={zustandStore}>
			{children}
		</MetricsPreferencesReactContext>
	);
}

export { MetricsPreferencesProvider };
