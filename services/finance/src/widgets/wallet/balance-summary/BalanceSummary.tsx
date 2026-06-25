import type { FC } from "react";

import { useTotalBalance, useWalletsList, WalletBalanceFx } from "@feature/wallet";

type BalanceSummaryProps = object;


const BalanceSummary: FC<BalanceSummaryProps> = () => {
	const { wallets, status } = useWalletsList();
	const totalBalance = useTotalBalance(wallets);
	
	return (
		<div className="text-card-foreground">
			<h2 className="text-lg font-medium opacity-90">Total Balance</h2>
			<WalletBalanceFx status={status}>
				<p className="text-3xl font-bold mt-1">
					{totalBalance}
				</p>
			</WalletBalanceFx>
		</div>
	);
}

BalanceSummary.displayName = 'BalanceSummary';

export { BalanceSummary };
export type { BalanceSummaryProps };