import { useBackfillPreferences } from "./use-backfill-preferences.ts";
import { useMirrorPreferences } from "./use-mirror-preferences.ts";

import type { FC } from "react";


const UserPreferencesSync: FC = () => {
	useMirrorPreferences();
	useBackfillPreferences();

	return null;
};

UserPreferencesSync.displayName = 'UserPreferencesSync';

export { UserPreferencesSync };
