import { isNegativeAmount } from "@shared/api";
import { FinanceMoney } from "@internal/ui-library";
import { MoneyInOriginal } from "@entity/localization";
import { WalletDetailsSkeleton, walletHasCreditLine, walletOwnedMoney, walletPeriodLabel } from "@entity/wallets";
import { useConvertMoney } from "@feature/localization";
import { useLocaleCurrency } from "@shared/formatting";
import { Caption, Overline } from "@shared/pure-components/typography";

import {FC, useMemo} from "react";
import type { WalletDetails, WalletFlows, WalletPeriod } from "@entity/wallets";


interface WalletBalanceDetailsProps {
	wallet: WalletDetails;
	period: WalletPeriod;
}

const WalletBalanceDetails: FC<WalletBalanceDetailsProps> = ({ wallet, period }) => {
	const format = useLocaleCurrency();
	const { convert } = useConvertMoney();
	
	const { ownedMoney, periodLabel, walletFlows } = useMemo(() => ({
		ownedMoney: walletOwnedMoney(wallet),
		periodLabel: walletPeriodLabel(period),
		walletFlows: wallet.period,
	}), [period, wallet]);

	return (
		<div className="mt-[18px] flex flex-wrap items-end gap-x-5 gap-y-3 sm:flex-nowrap">
			<div className="flex w-full flex-col sm:w-auto">
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
						Yours · {format(ownedMoney.amount, ownedMoney.currency)}
					</Caption>
				) : null}
			</div>
			<WalletDetailsSkeleton.Metrics>
				{walletFlows === undefined ? (
					<>
						<WalletDetailsSkeleton.Metric />
						<WalletDetailsSkeleton.Metric />
					</>
				) : (
					<WalletPeriodFlows
						flows={walletFlows}
						periodLabel={periodLabel}
						format={format}
					/>
				)}
			</WalletDetailsSkeleton.Metrics>
		</div>
	);
}

interface WalletPeriodFlowsProps {
	flows: WalletFlows;
	periodLabel: string;
	format: (amount: string, currency: string) => string;
}

const WalletPeriodFlows: FC<WalletPeriodFlowsProps> = ({ flows, periodLabel, format }) => (
	<>
		<div className="min-w-0">
			<Caption size="11">In · {periodLabel}</Caption>
			<FinanceMoney tone="pos" size="md">
				{format(flows.inflow.amount, flows.inflow.currency)}
			</FinanceMoney>
		</div>
		<div className="min-w-0">
			<Caption size="11">Out · {periodLabel}</Caption>
			<FinanceMoney tone="neg" size="md">
				{format(flows.outflow.amount, flows.outflow.currency)}
			</FinanceMoney>
		</div>
	</>
);

WalletPeriodFlows.displayName = 'WalletPeriodFlows';

export { WalletBalanceDetails };
export type { WalletBalanceDetailsProps };
