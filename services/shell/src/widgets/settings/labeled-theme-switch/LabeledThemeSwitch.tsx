import type {FC, HTMLAttributes} from "react";
import { ChooseTheme } from "@feature/settings";
import { Label } from "@internal/ui-library";

interface LabeledThemeSwitchProps extends HTMLAttributes<HTMLDivElement> {
}

const LabeledThemeSwitch: FC<LabeledThemeSwitchProps> = ({ className, children, ...props }) => {
	return (
		<div
			className={[
				"flex align-middle justify-between space-x-2 p-2",
				className
			].join(" ")}
			{...props}
		>
			<Label htmlFor="color-theme">
				{children || 'Dark Theme'}
			</Label>
			<ChooseTheme />
		</div>
	)
}

LabeledThemeSwitch.displayName = 'LabeledThemeSwitch';

export { LabeledThemeSwitch };
export type { LabeledThemeSwitchProps };