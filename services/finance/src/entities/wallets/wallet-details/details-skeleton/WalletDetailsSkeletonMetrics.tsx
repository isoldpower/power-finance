import { cn } from "@internal/ui-library";

import type { BaseHTMLAttributes, FC, PropsWithChildren } from "react";


type WalletDetailsSkeletonMetricsProps = PropsWithChildren<
	Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>
>;

const WalletDetailsSkeletonMetrics: FC<WalletDetailsSkeletonMetricsProps> = ({
	children,
	...props
}) => (
	<div
		className={cn(
			"grid w-full grid-cols-2 gap-5 sm:ml-auto sm:flex sm:w-auto"
		)}
		{...props}
	>
		{children}
	</div>
);

WalletDetailsSkeletonMetrics.displayName = 'WalletDetailsSkeletonMetrics';

export { WalletDetailsSkeletonMetrics };
export type { WalletDetailsSkeletonMetricsProps };
