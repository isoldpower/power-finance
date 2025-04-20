import type {FC} from "react";
import type {SwitchProps} from "@radix-ui/react-switch";

import {useCallback, useMemo} from "react";
import {Switch} from "@shared/components";
import {useSettingsContext} from "@internal/shared";

interface ChooseThemeProps extends Omit<SwitchProps, 'checked' | 'defaultChecked'> {
}

const ChooseTheme: FC<ChooseThemeProps> = ({ onCheckedChange, ...props }) => {
	const settings = useSettingsContext();
	const isDarkTheme = useMemo(() => settings.theme === 'dark', [settings.theme]);

	const handleChange = useCallback((checked: boolean) => {
		settings.onUpdateField('theme', checked ? 'dark' : 'light');
		onCheckedChange && onCheckedChange(checked);
	}, [settings.onUpdateField]);

	return (
		<Switch
			onCheckedChange={handleChange}
			checked={isDarkTheme}
			id="color-theme"
			{...props}
		/>
	)
}

ChooseTheme.displayName = 'ChooseTheme';

export { ChooseTheme };
export type { ChooseThemeProps };