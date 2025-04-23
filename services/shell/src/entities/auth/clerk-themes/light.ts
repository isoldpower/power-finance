import {useColorVarToHex} from "@shared/lib";
import {useCallback, useMemo} from "react";

import type { UseClerkSpecificThemeReturn } from "./types.ts";

export const useClerkLightTheme = (): UseClerkSpecificThemeReturn => {
	const { getColor } = useColorVarToHex();

	// Theme variables are being computed at the execution time so we
	// need to store it as a callback
	const computeTheme = useCallback(() => ({
		variables: {
			colorPrimary: getColor("--sidebar-primary"),
			colorText: getColor("--sidebar-accent-foreground"),
			colorNeutral: getColor("--sidebar-foreground"),
			colorBackground: getColor("--sidebar-accent"),
			colorInputText: getColor("--sidebar-accent-foreground"),
			colorInputBackground: getColor("--sidebar-accent"),
		}
	}), [getColor]);

	return useMemo(() => ({
		computeTheme
	}), [computeTheme]);
}