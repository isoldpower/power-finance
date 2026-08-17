import { cn } from "@internal/ui-library";

import type { BaseHTMLAttributes, FC, PropsWithChildren } from "react";


type WalletFormSkeletonBodyProps = PropsWithChildren<
	Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>
>;

const WalletFormSkeletonBody: FC<WalletFormSkeletonBodyProps> = ({
	children,
	...props
}) => (
	<div
		className={cn(
			"flex-1 overflow-auto p-5"
		)}
		{...props}
	>
		{children}
	</div>
);

WalletFormSkeletonBody.displayName = 'WalletFormSkeletonBody';

export { WalletFormSkeletonBody };
export type { WalletFormSkeletonBodyProps };
