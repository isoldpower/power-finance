import type {Theme} from "@clerk/types";

interface UseClerkSpecificThemeReturn {
	computeTheme: () => Theme;
}

export type { UseClerkSpecificThemeReturn };