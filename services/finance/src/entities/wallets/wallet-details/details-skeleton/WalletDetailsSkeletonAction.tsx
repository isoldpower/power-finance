import { cn, UiSkeleton } from "@internal/ui-library";

import type { FC } from "react";


type WalletDetailsSkeletonActionSize = 'sm' | 'md';

interface WalletDetailsSkeletonActionProps {
	size?: WalletDetailsSkeletonActionSize;
}

const WIDTH_BY_SIZE: Record<WalletDetailsSkeletonActionSize, string> = {
	sm: 'w-[62px]',
	md: 'w-[86px]',
};

const WalletDetailsSkeletonAction: FC<WalletDetailsSkeletonActionProps> = ({ size = 'md' }) => (
	<UiSkeleton className={cn("h-8 rounded-[var(--radius-md)]", WIDTH_BY_SIZE[size])} />
);

WalletDetailsSkeletonAction.displayName = 'WalletDetailsSkeletonAction';

export { WalletDetailsSkeletonAction };
export type { WalletDetailsSkeletonActionProps, WalletDetailsSkeletonActionSize };
