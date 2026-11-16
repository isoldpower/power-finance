import { cn, UiSkeleton } from "@internal/ui-library";

import type { FC } from "react";


interface PreferenceSkeletonProps {
	className?: string;
}

const PreferenceSkeleton: FC<PreferenceSkeletonProps> = ({ className }) => (
	<UiSkeleton className={cn("h-8 w-full rounded-[var(--radius-sm)]", className)} />
);

PreferenceSkeleton.displayName = 'PreferenceSkeleton';

export { PreferenceSkeleton };
export type { PreferenceSkeletonProps };
