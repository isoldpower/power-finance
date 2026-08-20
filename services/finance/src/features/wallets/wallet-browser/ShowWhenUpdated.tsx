import type { FC, ReactNode } from "react";
import type { Wallet } from "@entity/wallets";


interface ShowWhenUpdatedProps {
	wallet: Wallet;
	children: ((date: Date) => ReactNode) | ReactNode;
}

const ShowWhenUpdated: FC<ShowWhenUpdatedProps> = ({
	children,
	wallet,
}) => {
	return wallet.updatedAt && (typeof children === "function" 
		? children(new Date(wallet.updatedAt))
		: children);
}

export { ShowWhenUpdated };