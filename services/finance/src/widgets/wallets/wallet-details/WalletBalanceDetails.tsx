import { isNegativeAmount } from "@shared/api";
import { FinanceMoney } from "@internal/ui-library";
import { MoneyInOriginal } from "@entity/localization";
import { walletHasCreditLine, walletOwnedMoney, walletPeriodLabel } from "@entity/wallets";
import { useConvertMoney } from "@feature/localization";
import { useLocaleCurrency } from "@shared/formatting";
import { Caption, Overline } from "@shared/pure-components/typography";

import type { FC } from "react";
import type { WalletDetails, WalletPeriod } from "@entity/wallets";


interface WalletBalanceDetailsProps {
	wallet: WalletDetails;
	period: WalletPeriod;
}

const WalletBalanceDetails: FC<WalletBalanceDetailsProps> = ({ wallet, period }) => {
	const format = useLocaleCurrency();
	const { convert } = useConvertMoney();
	const owned = walletOwnedMoney(wallet);
	const periodLabel = walletPeriodLabel(period);

	return (
		<div className="mt-[18px] flex items-end gap-5">
			<div className="flex flex-col">
				<Overline size="10" tracking="0.1em">
					{walletHasCreditLine(wallet) ? 'Spendable' : 'Balance'}
				</Overline>
				<MoneyInOriginal align="start">
					<MoneyInOriginal.Amount
						tone={isNegativeAmount(wallet.balance.amount) ? 'neg' : 'neutral'}
						size="xl"
					>
						{format(wallet.balance.amount, wallet.balance.currency)}
					</MoneyInOriginal.Amount>
					<MoneyInOriginal.Converted>
						{convert(wallet.balance).formatted}
					</MoneyInOriginal.Converted>
				</MoneyInOriginal>
				{walletHasCreditLine(wallet) ? (
					<Caption size="11">
						Yours · {format(owned.amount, owned.currency)}
					</Caption>
				) : null}
			</div>
			<div className="flex-1" />
			<div>
				<Caption size="11">In · {periodLabel}</Caption>
				<FinanceMoney tone="pos" size="md">
					{format(wallet.period.inflow.amount, wallet.period.inflow.currency)}
				</FinanceMoney>
			</div>
			<div>
				<Caption size="11">Out · {periodLabel}</Caption>
				<FinanceMoney tone="neg" size="md">
					{format(wallet.period.outflow.amount, wallet.period.outflow.currency)}
				</FinanceMoney>
			</div>
		</div>
	);
}

export { WalletBalanceDetails };
export type { WalletBalanceDetailsProps };
