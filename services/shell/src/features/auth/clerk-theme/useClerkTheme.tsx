import {useEffect, useState} from "react";
import {useSettingsContext} from "@internal/shared";

import type {Theme} from "@clerk/types";
import type {ThemeType} from "@internal/shared";
import type {UseClerkSpecificThemeReturn} from "@entity/auth";

type UseClerkThemeOptions = Record<ThemeType, UseClerkSpecificThemeReturn>
type UseClerkThemeReturn = Theme | undefined;

const useClerkTheme = (dictionary: UseClerkThemeOptions): UseClerkThemeReturn => {
	const [clerkTheme, setClerkTheme] = useState<Theme>({});
	const { theme } = useSettingsContext();

	useEffect(() => {
		// We send the setClerkTheme routine to the TaskQueue
		// to ensure that we compute properties after the DOM has updated its style
		Promise.resolve()
			.then(() => dictionary[theme])
			.then((theme) => theme.computeTheme())
			.then((computedTheme) => setClerkTheme(computedTheme));
	}, [dictionary, theme]);

	return clerkTheme;
}

export { useClerkTheme };
export type { UseClerkThemeReturn };