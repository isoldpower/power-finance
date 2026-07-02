import type { FC } from "react";

const ActivityFeedSkeleton: FC = () => (
	<div className="px-[18px] py-8 text-center text-[13px] text-text-3">Loading…</div>
);

ActivityFeedSkeleton.displayName = 'ActivityFeedSkeleton';

export { ActivityFeedSkeleton };
