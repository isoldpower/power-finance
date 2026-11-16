import { Caption } from "@internal/shared";

import type { BaseHTMLAttributes, FC, PropsWithChildren } from "react";


type ActivityRowBodyProps = PropsWithChildren<Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>>;

const ActivityRowBody: FC<ActivityRowBodyProps> = ({
	children,
	...props
}) => (
	<Caption size="11.5" className="flex items-center gap-1.5" {...props}>
		{children}
	</Caption>
);

ActivityRowBody.displayName = 'ActivityRowBody';

export { ActivityRowBody };
export type { ActivityRowBodyProps };
