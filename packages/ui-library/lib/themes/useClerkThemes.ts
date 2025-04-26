import { useCallback, useMemo } from "react";
import { useColorVarToHex } from "../utils/hooks/useColorVarToHex.ts";

import type { UseClerkSpecificThemeReturn } from "@internal/shared";


const commonStyles: Record<string, string> = {
	colorPrimary: "--sidebar-primary",
	colorText: "--sidebar-accent-foreground",
	colorNeutral: "--sidebar-foreground",
	colorBackground: "--sidebar-accent",
	colorInputText: "--sidebar-accent-foreground",
	colorInputBackground: "--sidebar-accent",
}

const useClerkDarkTheme = (): UseClerkSpecificThemeReturn => {
	const { getColor } = useColorVarToHex();

	// Theme variables are being computed at the execution time so we
	// need to store it as a callback
	const computeTheme = useCallback(() => ({
		variables: {
			...Object.fromEntries(
				Object.entries(commonStyles).map(([key, value]) => ([key, getColor(value)]))
			)
		}
	}), [getColor]);

	return useMemo(() => ({
		computeTheme
	}), [computeTheme]);
}

const useClerkLightTheme = (): UseClerkSpecificThemeReturn => {
	const { getColor } = useColorVarToHex();

	// Theme variables are being computed at the execution time so we
	// need to store it as a callback
	const computeTheme = useCallback(() => ({
		variables: {
			...Object.fromEntries(
				Object.entries(commonStyles).map(([key, value]) => ([key, getColor(value)]))
			)
		}
	}), [getColor]);

	return useMemo(() => ({
		computeTheme
	}), [computeTheme]);
}

export { useClerkDarkTheme, useClerkLightTheme };
