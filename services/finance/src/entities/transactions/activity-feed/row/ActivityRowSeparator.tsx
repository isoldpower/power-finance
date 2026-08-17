import { cn } from "@internal/ui-library";

import type { BaseHTMLAttributes, FC, PropsWithChildren } from "react";


type ActivityRowSeparatorProps = PropsWithChildren<Omit<BaseHTMLAttributes<HTMLSpanElement>, 'className'>>;

const ActivityRowSeparator: FC<ActivityRowSeparatorProps> = ({
	children,
	...props
}) => (
	<span
		className={cn(
			"size-[3px] rounded-full bg-text-3"
		)}
		{...props}
	>
		{children}
	</span>
);

ActivityRowSeparator.displayName = 'ActivityRowSeparator';

export { ActivityRowSeparator };
export type { ActivityRowSeparatorProps };
