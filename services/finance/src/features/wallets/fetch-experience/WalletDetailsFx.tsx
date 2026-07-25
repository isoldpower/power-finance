import { FinanceCard } from "@internal/ui-library";
import type { Wallet } from "@entity/wallets";
import type { FC, ReactNode } from "react";


interface WalletDetailsFxProps {
	isError: boolean;
	isPending: boolean;
	wallet: Wallet | undefined;
	children: (wallet: Wallet) => ReactNode;
}

const WalletDetailsFx: FC<WalletDetailsFxProps> = ({ 
	isError,
	isPending,
	wallet,
	children,
}) => {
	if (isError) {
		return (
			<FinanceCard className="px-6 py-16 text-center text-[13px] text-neg">
				Couldn't load this wallet.
			</FinanceCard>
		);
	} else if (isPending || !wallet) {
		return (
			<FinanceCard className="overflow-hidden">
				<div className="h-64 animate-pulse bg-surface-2" />
			</FinanceCard>
		);
	}
	
	return children(wallet);
}

export { WalletDetailsFx };