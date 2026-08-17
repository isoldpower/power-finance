import { ActivityFeedSkeletonDay } from "./skeleton/ActivityFeedSkeletonDay.tsx";
import { ActivityFeedSkeletonGroupHeader } from "./skeleton/ActivityFeedSkeletonGroupHeader.tsx";
import { ActivityFeedSkeletonRow } from "./skeleton/ActivityFeedSkeletonRow.tsx";

import type { BaseHTMLAttributes, FC, PropsWithChildren } from "react";
import type { ActivityFeedSkeletonDayProps } from "./skeleton/ActivityFeedSkeletonDay.tsx";


type ActivityFeedSkeletonProps = PropsWithChildren<
	Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>
>;
type ActivityFeedSkeletonObject = FC<ActivityFeedSkeletonProps> & {
	Day: FC<ActivityFeedSkeletonDayProps>;
	GroupHeader: FC;
	Row: FC;
}

const ActivityFeedSkeleton: ActivityFeedSkeletonObject = ({
	children,
	...props
}) => (
	<div {...props}>
		{children}
	</div>
);

ActivityFeedSkeleton.Day = ActivityFeedSkeletonDay;
ActivityFeedSkeleton.GroupHeader = ActivityFeedSkeletonGroupHeader;
ActivityFeedSkeleton.Row = ActivityFeedSkeletonRow;
ActivityFeedSkeleton.displayName = 'ActivityFeedSkeleton';

export { ActivityFeedSkeleton };
export type { ActivityFeedSkeletonProps };
