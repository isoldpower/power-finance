import { RouteLink } from "@feature/navigation";

import type { FC } from "react";
import type { RouteLinkProps } from "@feature/navigation";


const ActivityFeedHeaderLink: FC<Omit<RouteLinkProps, 'className'>> = ({
	children,
	...props
}) => {
	return (
		<RouteLink className="text-[12.5px] font-semibold text-primary hover:underline" {...props}>
			{children}
		</RouteLink>
	);
}

export { ActivityFeedHeaderLink };