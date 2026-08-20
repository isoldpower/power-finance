import { UiSkeleton } from "@internal/ui-library";

import type { FC } from "react";


const GoalSkeletonIcon: FC = () => (
	<UiSkeleton className="size-9 flex-none rounded-[10px]" />
);

GoalSkeletonIcon.displayName = 'GoalSkeletonIcon';

export { GoalSkeletonIcon };
