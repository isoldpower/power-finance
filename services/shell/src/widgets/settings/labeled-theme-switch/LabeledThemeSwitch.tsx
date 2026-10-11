import type { FC, HTMLAttributes } from "react";
import { cn, UiLabel } from "@internal/ui-library";
import { ChooseTheme } from "@feature/settings";


type LabeledThemeSwitchProps = HTMLAttributes<HTMLDivElement>;

const LabeledThemeSwitch: FC<LabeledThemeSwitchProps> = ({ className, children, ...props }) => {
	return (
		<div
			className={cn("flex align-middle justify-between space-x-2 p-2", className)}
			{...props}
		>
			<UiLabel htmlFor="color-theme">
				{children ?? 'Dark Theme'}
			</UiLabel>
			<ChooseTheme />
		</div>
	);
};

LabeledThemeSwitch.displayName = 'LabeledThemeSwitch';

export { LabeledThemeSwitch };
export type { LabeledThemeSwitchProps };
