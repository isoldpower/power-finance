import { cn } from "@internal/ui-library";

import type { BaseHTMLAttributes, FC, PropsWithChildren } from "react";


type WalletDetailsSkeletonHeaderProps = PropsWithChildren<
	Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>
>;

const WalletDetailsSkeletonHeader: FC<WalletDetailsSkeletonHeaderProps> = ({
	children,
	...props
}) => (
	<div
		className={cn(
			"border-b border-border px-6 py-[22px]"
		)}
		{...props}
	>
		{children}
	</div>
);

WalletDetailsSkeletonHeader.displayName = 'WalletDetailsSkeletonHeader';

export { WalletDetailsSkeletonHeader };
export type { WalletDetailsSkeletonHeaderProps };
