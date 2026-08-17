import type { Wallet } from "@entity/wallets";
import { FC, ReactNode } from "react";


interface EditWalletDetailsFx {
	wallet: Wallet | undefined;
	isPending: boolean;
	isError: boolean;
	children: ((wallet: Wallet) => ReactNode) | ReactNode;
}

const EditWalletDetailsFx: FC<EditWalletDetailsFx> = ({
	isError,
	isPending,
	wallet,
	children
}) => {
	if (isPending) {
		return (
			<div>We are still loading...</div>
		);
	} else if (isError || !wallet) {
		return (
			<div>Ooops, something went wrong :(</div>
		);
	}
	
	return typeof children === 'function' 
		? children(wallet) 
		: children;
}

export { EditWalletDetailsFx };