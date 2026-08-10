import { cn } from "@internal/ui-library";

import type { ButtonHTMLAttributes, FC } from "react";


const GoalsToolbarAction: FC<Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'type'>> = ({
	children,
	...props
}) => (
	<button
		type="button"
		className={cn(
			"text-[12.5px] font-semibold text-primary hover:underline"
		)}
		{...props}
	>
		{children}
	</button>
);

GoalsToolbarAction.displayName = 'GoalsToolbarAction';

export { GoalsToolbarAction };
