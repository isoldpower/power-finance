import {useEffect, useState} from "react";
import {Theme} from "@clerk/types";
import {useColorVarToHex} from "@shared/lib";
import {useSettingsContext} from "@internal/shared";

type UseClerkThemeReturn = Theme | undefined;

const useClerkTheme = (): UseClerkThemeReturn => {
	const [clerkTheme, setClerkTheme] = useState<Theme>({});
	const { getColor } = useColorVarToHex();
	const { theme } = useSettingsContext();

	useEffect(() => {
		// We send the setClerkTheme routine to the TaskQueue
		// to ensure that we compute properties after the DOM has updated its style
		Promise.resolve().then(() => setClerkTheme({
			variables: {
				colorPrimary: getColor('--primary-foreground'),
				colorText: getColor('--primary'),
				colorBackground: getColor('--background'),
			},
		}));
	}, [theme]);

	return clerkTheme;
}

export { useClerkTheme };
export type { UseClerkThemeReturn };