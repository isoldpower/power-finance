import { cn } from "@internal/ui-library";
import { RouteLink } from "@shared/routing";

import type { FC } from "react";
import type { RouteLinkProps } from "@shared/routing";
import { textClass } from "@shared/pure-components/typography";


const ActivityFeedHeaderLink: FC<Omit<RouteLinkProps, 'className'>> = ({
	children,
	...props
}) => {
	return (
		<RouteLink className={cn(textClass({ size: '12.5', weight: 'semibold', tone: 'accent' }), "hover:underline")} {...props}>
			{children}
		</RouteLink>
	);
}

export { ActivityFeedHeaderLink };