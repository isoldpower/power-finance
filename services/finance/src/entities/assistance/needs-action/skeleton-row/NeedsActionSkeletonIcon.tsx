import { UiSkeleton } from "@internal/ui-library";

import type { FC } from "react";


const NeedsActionSkeletonIcon: FC = () => (
	<UiSkeleton className="size-[34px] flex-none rounded-[9px]" />
);

NeedsActionSkeletonIcon.displayName = 'NeedsActionSkeletonIcon';

export { NeedsActionSkeletonIcon };
