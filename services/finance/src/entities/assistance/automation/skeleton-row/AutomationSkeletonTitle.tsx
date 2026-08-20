import { UiSkeleton } from "@internal/ui-library";

import type { FC } from "react";


const AutomationSkeletonTitle: FC = () => (
	<UiSkeleton className="h-3.5 w-1/2" />
);

AutomationSkeletonTitle.displayName = 'AutomationSkeletonTitle';

export { AutomationSkeletonTitle };
