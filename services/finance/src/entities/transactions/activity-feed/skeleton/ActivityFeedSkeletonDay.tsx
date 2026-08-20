import type { BaseHTMLAttributes, FC, PropsWithChildren } from "react";


type ActivityFeedSkeletonDayProps = PropsWithChildren<
	Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>
>;

const ActivityFeedSkeletonDay: FC<ActivityFeedSkeletonDayProps> = ({
	children,
	...props
}) => (
	<div {...props}>
		{children}
	</div>
);

ActivityFeedSkeletonDay.displayName = 'ActivityFeedSkeletonDay';

export { ActivityFeedSkeletonDay };
export type { ActivityFeedSkeletonDayProps };
