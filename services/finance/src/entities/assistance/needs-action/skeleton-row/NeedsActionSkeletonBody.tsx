import { cn } from "@internal/ui-library";

import type { BaseHTMLAttributes, FC, PropsWithChildren } from "react";


type NeedsActionSkeletonBodyProps = PropsWithChildren<
	Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>
>;

const NeedsActionSkeletonBody: FC<NeedsActionSkeletonBodyProps> = ({
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

NeedsActionSkeletonBody.displayName = 'NeedsActionSkeletonBody';

export { NeedsActionSkeletonBody };
export type { NeedsActionSkeletonBodyProps };
