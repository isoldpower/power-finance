import type { FC } from "react";

import { useTotalBalance , useWalletsList } from "@feature/wallet";
import { HeadingTextLoading } from "@feature/wallet";

type BalanceSummaryProps = object;


const BalanceSummary: FC<BalanceSummaryProps> = () => {
	const { wallets, isPending } = useWalletsList();
	const totalBalance = useTotalBalance(wallets);

	return (
		<div className="text-card-foreground">
			<h2 className="text-lg font-medium opacity-90">Total Balance</h2>
			{isPending
				? (
					<HeadingTextLoading />
				)
				: (
					<p className="text-3xl font-bold mt-1">
						{totalBalance}
					</p>
				)}
		</div>
	);
}

BalanceSummary.displayName = 'BalanceSummary';

export { BalanceSummary };
export type { BalanceSummaryProps };