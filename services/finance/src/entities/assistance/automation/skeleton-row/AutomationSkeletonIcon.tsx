import { UiSkeleton } from "@internal/ui-library";

import type { FC } from "react";


const AutomationSkeletonIcon: FC = () => (
	<UiSkeleton className="size-[34px] flex-none rounded-[9px]" />
);

AutomationSkeletonIcon.displayName = 'AutomationSkeletonIcon';

export { AutomationSkeletonIcon };
