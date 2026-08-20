import { cn } from "@internal/ui-library";

import type { BaseHTMLAttributes, FC, PropsWithChildren } from "react";


type WalletDetailsSkeletonActionsProps = PropsWithChildren<
	Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>
>;

const WalletDetailsSkeletonActions: FC<WalletDetailsSkeletonActionsProps> = ({
	children,
	...props
}) => (
	<div
		className={cn(
			"flex gap-2"
		)}
		{...props}
	>
		{children}
	</div>
);

WalletDetailsSkeletonActions.displayName = 'WalletDetailsSkeletonActions';

export { WalletDetailsSkeletonActions };
export type { WalletDetailsSkeletonActionsProps };
