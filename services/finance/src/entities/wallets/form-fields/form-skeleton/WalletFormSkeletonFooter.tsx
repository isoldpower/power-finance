import { cn, UiSkeleton } from "@internal/ui-library";

import type { FC } from "react";


const WalletFormSkeletonFooter: FC = () => (
	<div
		className={cn(
			"flex gap-2.5 border-t border-border px-5 py-4"
		)}
	>
		<UiSkeleton className="h-10 flex-1 rounded-[var(--radius-md)]" />
		<UiSkeleton className="h-10 w-[92px] rounded-[var(--radius-md)]" />
	</div>
);

WalletFormSkeletonFooter.displayName = 'WalletFormSkeletonFooter';

export { WalletFormSkeletonFooter };
