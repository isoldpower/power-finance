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
			"flex w-full gap-2 sm:w-auto [&>*]:flex-1 sm:[&>*]:flex-none"
		)}
		{...props}
	>
		{children}
	</div>
);

WalletDetailsSkeletonActions.displayName = 'WalletDetailsSkeletonActions';

export { WalletDetailsSkeletonActions };
export type { WalletDetailsSkeletonActionsProps };
