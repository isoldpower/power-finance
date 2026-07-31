import { RouteLink } from "@feature/navigation";

import type { FC } from "react";
import type { RouteLinkProps } from "@feature/navigation";


const QuickAddLink: FC<Omit<RouteLinkProps, 'className'>> = ({
	children,
	...props
}) => (
	<RouteLink className="mt-2.5 block text-center text-xs text-text-3" {...props}>
		{children}
	</RouteLink>
);

export { QuickAddLink };