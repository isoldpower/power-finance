import { cn } from "@internal/ui-library";

import type { BaseHTMLAttributes, FC, PropsWithChildren } from "react";


type WalletDetailsSkeletonRowsProps = PropsWithChildren<
	Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>
>;

const WalletDetailsSkeletonRows: FC<WalletDetailsSkeletonRowsProps> = ({
	children,
	...props
}) => (
	<div
		className={cn(
			"flex flex-col"
		)}
		{...props}
	>
		{children}
	</div>
);

WalletDetailsSkeletonRows.displayName = 'WalletDetailsSkeletonRows';

export { WalletDetailsSkeletonRows };
export type { WalletDetailsSkeletonRowsProps };
