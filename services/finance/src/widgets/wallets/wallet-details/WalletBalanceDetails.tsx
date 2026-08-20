import { FinanceMoney } from "@internal/ui-library";
import { MoneyInOriginal } from "@entity/localization";
import { useConvertMoney } from "@feature/localization";
import { useWalletsPeriodFlow } from "@feature/wallets";
import { useLocaleCurrency } from "@shared/formatting";
import { Caption, Overline } from "@shared/pure-components/typography";

import type { FC } from "react";
import type { Wallet } from "@entity/wallets";


interface WalletBalanceDetailsProps {
	wallet: Wallet;
}

const WalletBalanceDetails: FC<WalletBalanceDetailsProps> = ({ wallet }) => {
	const format = useLocaleCurrency();
	const { convert } = useConvertMoney();
	const totalPeriodFlow = useWalletsPeriodFlow(wallet);

	return (
		<div className="mt-[18px] flex items-end gap-5">
			<div className="flex flex-col">
				<Overline size="10" tracking="0.1em">
					Balance
				</Overline>
				<MoneyInOriginal align="start">
					<MoneyInOriginal.Amount
						tone={wallet.balance.amount >= 0 ? 'neutral' : 'neg'}
						size="xl"
					>
						{format(wallet.balance.amount, wallet.balance.currency)}
					</MoneyInOriginal.Amount>
					<MoneyInOriginal.Converted>
						{convert(wallet.balance).formatted}
					</MoneyInOriginal.Converted>
				</MoneyInOriginal>
			</div>
			<div className="flex-1" />
			<div>
				<Caption size="11">In · {totalPeriodFlow.periodLabel}</Caption>
				<FinanceMoney tone="pos" size="md">
					{format(totalPeriodFlow.in, wallet.balance.currency)}
				</FinanceMoney>
			</div>
			<div>
				<Caption size="11">Out · {totalPeriodFlow.periodLabel}</Caption>
				<FinanceMoney tone="neg" size="md">
					{format(totalPeriodFlow.out, wallet.balance.currency)}
				</FinanceMoney>
			</div>
		</div>
	);
}

export { WalletBalanceDetails };