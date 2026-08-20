import { cn } from "@internal/ui-library";

import type { BaseHTMLAttributes, FC, PropsWithChildren } from "react";


type AutomationSkeletonBodyProps = PropsWithChildren<
	Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>
>;

const AutomationSkeletonBody: FC<AutomationSkeletonBodyProps> = ({
	children,
	...props
}) => (
	<div
		className={cn(
			"min-w-0 flex-1 space-y-1.5"
		)}
		{...props}
	>
		{children}
	</div>
);

AutomationSkeletonBody.displayName = 'AutomationSkeletonBody';

export { AutomationSkeletonBody };
export type { AutomationSkeletonBodyProps };
