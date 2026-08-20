import { SkeletonText } from "@shared/pure-components/feedback";
import { ActivityGroupHeader } from "../ActivityGroupHeader.tsx";

import type { FC } from "react";


const ActivityFeedSkeletonGroupHeader: FC = () => (
	<ActivityGroupHeader>
		<SkeletonText size="10" width="w-28" />
		<SkeletonText size="sm" family="display" width="w-16" />
	</ActivityGroupHeader>
);

ActivityFeedSkeletonGroupHeader.displayName = 'ActivityFeedSkeletonGroupHeader';

export { ActivityFeedSkeletonGroupHeader };
