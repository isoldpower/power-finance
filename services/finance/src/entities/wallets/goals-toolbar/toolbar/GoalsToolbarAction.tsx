import { cn } from "@internal/ui-library";
import { textClass } from "@shared/pure-components/typography";

import type { ButtonHTMLAttributes, FC, PropsWithChildren } from "react";


type GoalsToolbarActionProps = PropsWithChildren<
	Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'type'>
>;

const GoalsToolbarAction: FC<GoalsToolbarActionProps> = ({
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

GoalsToolbarAction.displayName = 'GoalsToolbarAction';

export { GoalsToolbarAction };
export type { GoalsToolbarActionProps };
