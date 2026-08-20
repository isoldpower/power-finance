import { UiSkeleton } from "@internal/ui-library";

import type { FC } from "react";


const AutomationSkeletonConditionLine: FC = () => (
	<UiSkeleton className="h-3 w-3/4" />
);

AutomationSkeletonConditionLine.displayName = 'AutomationSkeletonConditionLine';

export { AutomationSkeletonConditionLine };
