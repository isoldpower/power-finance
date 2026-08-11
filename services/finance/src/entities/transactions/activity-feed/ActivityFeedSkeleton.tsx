import { Caption } from "@shared/pure-components/typography";

import type { FC } from "react";

const ActivityFeedSkeleton: FC = () => (
	<Caption size="13" className="px-[18px] py-8 text-center">Loading…</Caption>
);

ActivityFeedSkeleton.displayName = 'ActivityFeedSkeleton';

export { ActivityFeedSkeleton };
