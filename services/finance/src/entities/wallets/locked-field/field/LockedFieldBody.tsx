import { cn } from "@internal/ui-library";

import type { BaseHTMLAttributes, FC, PropsWithChildren } from "react";


type LockedFieldBodyProps = PropsWithChildren<Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>>;

const LockedFieldBody: FC<LockedFieldBodyProps> = ({
	children,
	...props
}) => (
	<div
		className={cn(
			"flex min-w-0 flex-1 items-center justify-between gap-0.5"
		)}
		{...props}
	>
		{children}
	</div>
);

LockedFieldBody.displayName = 'LockedFieldBody';

export { LockedFieldBody };
export type { LockedFieldBodyProps };
