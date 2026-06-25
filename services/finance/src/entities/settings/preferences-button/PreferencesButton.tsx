import { Button, Icons } from "@internal/ui-library";
import type { ComponentProps, FC } from "react";

type PreferencesButtonProps = ComponentProps<'button'> & object;

const PreferencesButton: FC<PreferencesButtonProps> = ({ ...props }) => {
	return (
		<div className="flex items-center">
			<Button size="sm" {...props}>
				<Icons.Settings />
			</Button>
		</div>
	)
}

PreferencesButton.displayName = 'PreferencesButton';

export { PreferencesButton };
export type { PreferencesButtonProps };