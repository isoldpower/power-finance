import { useMirrorAccountPreferences } from "./use-mirror-account-preferences.ts";

import type { FC } from "react";


const AccountPreferencesSync: FC = () => {
	useMirrorAccountPreferences();

	return null;
};

AccountPreferencesSync.displayName = 'AccountPreferencesSync';

export { AccountPreferencesSync };
