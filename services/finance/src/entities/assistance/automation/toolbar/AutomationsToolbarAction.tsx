import { cn } from "@internal/ui-library";
import { textClass } from "@shared/pure-components/typography";

import type { ButtonHTMLAttributes, FC, PropsWithChildren } from "react";


type AutomationsToolbarActionProps = PropsWithChildren<
	Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'type'>
>;

const AutomationsToolbarAction: FC<AutomationsToolbarActionProps> = ({
	children,
	...props
}) => (
	<button
		type="button"
		className={cn(
			textClass({ size: '12.5', weight: 'semibold', tone: 'accent' }),
			"hover:underline"
		)}
		{...props}
	>
		{children}
	</button>
);

AutomationsToolbarAction.displayName = 'AutomationsToolbarAction';

export { AutomationsToolbarAction };
export type { AutomationsToolbarActionProps };
