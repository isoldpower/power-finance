import { Skeleton } from "@internal/ui-library";
import {FC} from "react";

interface SidebarSkeletonProps {
	withName?: boolean
}

const SidebarSkeleton: FC<SidebarSkeletonProps> = ({
	withName = true
}) => {
  return (
		<div className="flex items-center gap-4">
			<Skeleton
				className="h-7 w-7 rounded-full bg-sidebar-accent" />
			{withName && (
				<Skeleton className="h-5 w-16 rounded bg-sidebar-accent" />
			)}
		</div>
  )
}

SidebarSkeleton.displayName = 'SidebarSkeleton';

export { SidebarSkeleton };
