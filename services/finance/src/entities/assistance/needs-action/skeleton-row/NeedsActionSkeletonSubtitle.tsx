import { UiSkeleton } from "@internal/ui-library";

import type { FC } from "react";


const NeedsActionSkeletonSubtitle: FC = () => (
	<UiSkeleton className="h-3 w-3/4" />
);

NeedsActionSkeletonSubtitle.displayName = 'NeedsActionSkeletonSubtitle';

export { NeedsActionSkeletonSubtitle };
