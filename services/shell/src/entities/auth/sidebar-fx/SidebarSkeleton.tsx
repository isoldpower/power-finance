import {FC} from "react";
import {Skeleton} from "@shared/components";

const SidebarSkeleton: FC = ({ }) => {
  return (
		<div className="flex items-center gap-4 px-4 py-1">
			<Skeleton
				className="h-7 w-7 rounded-full bg-sidebar-accent" />
			<Skeleton
				className="h-5 w-16 rounded bg-sidebar-accent" />
		</div>
  )
}

SidebarSkeleton.displayName = 'SidebarSkeleton';

export { SidebarSkeleton };
