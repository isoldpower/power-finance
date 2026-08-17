import { cn } from "@internal/ui-library";
import { ActivityFeedHeaderLink } from "./feed-header/ActivityFeedHeaderLink.tsx";

import type { BaseHTMLAttributes, FC, PropsWithChildren } from "react";
import type { ActivityFeedHeaderLinkProps } from "./feed-header/ActivityFeedHeaderLink.tsx";


type ActivityFeedHeaderProps = PropsWithChildren<Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>>;
type ActivityFeedHeaderObject = FC<ActivityFeedHeaderProps> & {
	Link: FC<ActivityFeedHeaderLinkProps>;
}

const ActivityFeedHeader: ActivityFeedHeaderObject = ({
	children,
	...props
}) => (
	<div
		className={cn(
			"flex items-center gap-2.5 border-b border-border px-[18px] py-3.5"
		)}
		{...props}
	>
		{children}
	</div>
);

ActivityFeedHeader.Link = ActivityFeedHeaderLink;
ActivityFeedHeader.displayName = 'ActivityFeedHeader';

export { ActivityFeedHeader };
export type { ActivityFeedHeaderProps };
