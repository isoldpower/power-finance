import { FinanceCard, cn } from "@internal/ui-library";
import type { Wallet } from "@entity/wallets";
import type { FC, ReactNode } from "react";
import { textClass } from "@shared/pure-components/typography";


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
			<FinanceCard className={cn(textClass({ size: '13', tone: 'negative' }), "px-6 py-16 text-center")}>
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