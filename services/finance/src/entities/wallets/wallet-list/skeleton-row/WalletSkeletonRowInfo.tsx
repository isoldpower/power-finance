import type { FC, PropsWithChildren } from "react";


type WalletSkeletonRowInfoProps = PropsWithChildren;

const WalletSkeletonRowInfo: FC<WalletSkeletonRowInfoProps> = ({ children }) => (
	<div className="min-w-0 flex-1">
		{children}
	</div>
);

WalletSkeletonRowInfo.displayName = 'WalletSkeletonRowInfo';

export { WalletSkeletonRowInfo };
export type { WalletSkeletonRowInfoProps };
