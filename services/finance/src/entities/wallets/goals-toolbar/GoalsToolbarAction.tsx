import { cn } from "@internal/ui-library";

import type { ButtonHTMLAttributes, FC } from "react";
import { textClass } from "@shared/pure-components/typography";


const GoalsToolbarAction: FC<Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'type'>> = ({
	children,
	...props
}) => (
	<button
		type="button"
		className={cn(
			textClass({ size: '12.5', weight: 'semibold', tone: 'accent' }), "hover:underline"
		)}
		{...props}
	>
		{children}
	</button>
);

GoalsToolbarAction.displayName = 'GoalsToolbarAction';

export { GoalsToolbarAction };
