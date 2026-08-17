import { cn } from "@internal/ui-library";

import type { BaseHTMLAttributes, FC, PropsWithChildren } from "react";


type WalletDetailsSkeletonThumbnailProps = PropsWithChildren<
	Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>
>;

const WalletDetailsSkeletonThumbnail: FC<WalletDetailsSkeletonThumbnailProps> = ({
	children,
	...props
}) => (
	<div
		className={cn(
			"flex items-start gap-3.5"
		)}
		{...props}
	>
		{children}
	</div>
);

WalletDetailsSkeletonThumbnail.displayName = 'WalletDetailsSkeletonThumbnail';

export { WalletDetailsSkeletonThumbnail };
export type { WalletDetailsSkeletonThumbnailProps };
