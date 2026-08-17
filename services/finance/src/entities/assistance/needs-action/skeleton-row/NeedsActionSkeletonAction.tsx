import { UiSkeleton } from "@internal/ui-library";

import type { FC } from "react";


const NeedsActionSkeletonAction: FC = () => (
	<UiSkeleton className="h-8 w-16 flex-none rounded-[var(--radius-md)]" />
);

NeedsActionSkeletonAction.displayName = 'NeedsActionSkeletonAction';

export { NeedsActionSkeletonAction };
