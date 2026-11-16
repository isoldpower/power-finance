import { SkeletonText } from "@internal/shared";

import type { FC } from "react";


const TransactionRowSkeleton: FC = () => (
	<li className="flex items-center gap-3 px-2.5 py-2">
		<span className="size-2 rounded-full bg-accent" />
		<span className="flex flex-1 flex-col gap-1">
			<SkeletonText size="13" width="w-36" />
			<SkeletonText size="11" width="w-24" />
		</span>
		<SkeletonText size="13" width="w-16" />
	</li>
);

TransactionRowSkeleton.displayName = 'TransactionRowSkeleton';

export { TransactionRowSkeleton };
