import { cn } from "@internal/ui-library";

import type { BaseHTMLAttributes, FC, PropsWithChildren } from "react";


type WalletDetailsSkeletonBalancesProps = PropsWithChildren<
	Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>
>;

const WalletDetailsSkeletonBalances: FC<WalletDetailsSkeletonBalancesProps> = ({
	children,
	...props
}) => (
	<div
		className={cn(
			"mt-[18px] flex items-end gap-5"
		)}
		{...props}
	>
		{children}
	</div>
);

WalletDetailsSkeletonBalances.displayName = 'WalletDetailsSkeletonBalances';

export { WalletDetailsSkeletonBalances };
export type { WalletDetailsSkeletonBalancesProps };
