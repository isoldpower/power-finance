import { cn } from "@internal/ui-library";

import type { BaseHTMLAttributes, FC, PropsWithChildren } from "react";


type WalletDetailsSkeletonBodyProps = PropsWithChildren<
	Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>
>;

const WalletDetailsSkeletonBody: FC<WalletDetailsSkeletonBodyProps> = ({
	children,
	...props
}) => (
	<div
		className={cn(
			"min-w-0 flex-1"
		)}
		{...props}
	>
		{children}
	</div>
);

WalletDetailsSkeletonBody.displayName = 'WalletDetailsSkeletonBody';

export { WalletDetailsSkeletonBody };
export type { WalletDetailsSkeletonBodyProps };
