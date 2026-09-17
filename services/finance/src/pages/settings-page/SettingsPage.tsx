import { SettingsWorkspace } from "@process/configuration";
import { SettingsPreferencesProvider, SettingsTabSync } from "@feature/configuration";

import type { FC } from 'react';


const SettingsPage: FC = () => {
	return (
		<SettingsPreferencesProvider>
			<SettingsTabSync />
			<SettingsWorkspace />
		</SettingsPreferencesProvider>
	);
};

SettingsPage.displayName = 'SettingsPage';

export { SettingsPage };
