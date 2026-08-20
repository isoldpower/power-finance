import { cn } from "@internal/ui-library";

import type { BaseHTMLAttributes, FC, PropsWithChildren } from "react";
import type { NonNeutralTone } from "@shared/formatting";


type ActivityRowIconProps = PropsWithChildren<Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'> & {
	tone: NonNeutralTone;
}>;

const ActivityRowIcon: FC<ActivityRowIconProps> = ({
	children,
	tone,
	...props
}) => (
	<div
		className={cn(
			"flex size-8 flex-none items-center justify-center rounded-[8px]",
			tone === 'positive' && "bg-pos-soft text-pos",
			tone === 'negative' && "bg-[var(--neg-soft)] text-neg"
		)}
		{...props}
	>
		{children}
	</div>
);

ActivityRowIcon.displayName = 'ActivityRowIcon';

export { ActivityRowIcon };
export type { ActivityRowIconProps };
