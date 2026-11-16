import {useEffect, useState} from "react";
import { useSettingsContext } from "../../settings/index.ts";

import type { Theme } from "@clerk/types";
import type { ThemeType } from "../../settings/index.ts";
import type { UseClerkSpecificThemeReturn } from "../types.ts";

type UseClerkThemeOptions = Record<ThemeType, UseClerkSpecificThemeReturn>
type UseClerkThemeReturn = Theme | undefined;

let lastComputedTheme: Theme = {};

const useClerkTheme = (dictionary: UseClerkThemeOptions): UseClerkThemeReturn => {
	const [clerkTheme, setClerkTheme] = useState<Theme>(lastComputedTheme);
	const { theme } = useSettingsContext();

	useEffect(() => {
		Promise.resolve()
			.then(() => dictionary[theme])
			.then((theme) => theme.computeTheme())
			.then((computedTheme) => {
				lastComputedTheme = computedTheme;
				setClerkTheme(computedTheme)
			})
			.catch((error) => {
				console.error("Error computing theme:", error);
			});
	}, [dictionary, theme]);

	return clerkTheme;
}

export { useClerkTheme };
export type { UseClerkThemeReturn, UseClerkThemeOptions };