import { UiButton, Icons } from "@internal/ui-library";
import type { ComponentProps, FC } from "react";

type PreferencesButtonProps = ComponentProps<'button'> & object;

const PreferencesButton: FC<PreferencesButtonProps> = ({ ...props }) => {
	return (
		<div className="flex items-center">
			<UiButton size="sm" {...props}>
				<Icons.Settings />
			</UiButton>
		</div>
	)
}

PreferencesButton.displayName = 'PreferencesButton';

export { PreferencesButton };
export type { PreferencesButtonProps };