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
			"mt-[18px] flex flex-wrap items-end gap-x-5 gap-y-3 sm:flex-nowrap"
		)}
		{...props}
	>
		{children}
	</div>
);

WalletDetailsSkeletonBalances.displayName = 'WalletDetailsSkeletonBalances';

export { WalletDetailsSkeletonBalances };
export type { WalletDetailsSkeletonBalancesProps };
