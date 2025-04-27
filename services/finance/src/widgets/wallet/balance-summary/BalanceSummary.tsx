import type { FC } from "react";
import { useTotalBalance, useWallets } from "@feature/wallet";

interface BalanceSummaryProps {}

const BalanceSummary: FC<BalanceSummaryProps> = () => {
	const { wallets } = useWallets();
	const totalBalance = useTotalBalance(wallets);

	return (
		<div>
			<h2 className="text-lg font-medium text-white opacity-90">Total Balance</h2>
			<p className="text-3xl font-bold mt-1">{totalBalance}</p>
		</div>
	);
}

BalanceSummary.displayName = 'BalanceSummary';

export { BalanceSummary };
export type { BalanceSummaryProps };