import { UiSkeleton } from "@internal/ui-library";

import type { FC } from "react";


const NeedsActionSkeletonTitle: FC = () => (
	<UiSkeleton className="h-3.5 w-1/2" />
);

NeedsActionSkeletonTitle.displayName = 'NeedsActionSkeletonTitle';

export { NeedsActionSkeletonTitle };
