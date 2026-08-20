import { cn } from "@internal/ui-library";
import { RouteLink } from "@shared/routing";
import { textClass } from "@shared/pure-components/typography";

import type { FC } from "react";
import type { RouteLinkProps } from "@shared/routing";


type ActivityFeedHeaderLinkProps = Omit<RouteLinkProps, 'className'>;

const ActivityFeedHeaderLink: FC<ActivityFeedHeaderLinkProps> = ({
	children,
	...props
}) => (
	<RouteLink
		className={cn(
			textClass({ size: '12.5', weight: 'semibold', tone: 'accent' }),
			"hover:underline"
		)}
		{...props}
	>
		{children}
	</RouteLink>
);

ActivityFeedHeaderLink.displayName = 'ActivityFeedHeaderLink';

export { ActivityFeedHeaderLink };
export type { ActivityFeedHeaderLinkProps };
