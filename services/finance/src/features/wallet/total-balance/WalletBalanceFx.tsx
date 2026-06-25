import type { FC, PropsWithChildren } from "react";

import { HeadingTextLoading } from "@feature/wallet";


type WalletBalanceFxProps = PropsWithChildren<{ 
	status: 'pending' | 'success' | 'error';
}>;

const WalletBalanceFx: FC<WalletBalanceFxProps> = ({ children, status }) => {
	switch (status) {
		case 'pending':
			return <HeadingTextLoading />;
		case 'error':
			return (
				<p className="text-3xl font-bold mt-1">
					Error
				</p>
			);
		default:
			return children;
	}
}

WalletBalanceFx.displayName = 'WalletBalanceFx';

export { WalletBalanceFx };
export type { WalletBalanceFxProps };