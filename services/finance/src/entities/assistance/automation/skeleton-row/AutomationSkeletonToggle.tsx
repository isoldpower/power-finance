import { UiSkeleton } from "@internal/ui-library";

import type { FC } from "react";


const AutomationSkeletonToggle: FC = () => (
	<UiSkeleton className="h-5 w-9 flex-none rounded-full" />
);

AutomationSkeletonToggle.displayName = 'AutomationSkeletonToggle';

export { AutomationSkeletonToggle };
