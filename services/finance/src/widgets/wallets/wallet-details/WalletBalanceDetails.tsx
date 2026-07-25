import {MoneyInOriginal} from "@entity/localization";
import {Wallet} from "@entity/wallets";
import {FC} from "react";
import {useLocaleCurrency} from "@shared/utils";
import {useConvertMoney} from "@feature/localization";
import {FinanceMoney} from "@internal/ui-library";
import {useWalletsPeriodFlow} from "@feature/wallets/wallet-browser/use-wallets-period-flow.ts";


interface WalletBalanceDetailsProps {
	wallet: Wallet;
}

const WalletBalanceDetails: FC<WalletBalanceDetailsProps> = ({ wallet }) => {
	const format = useLocaleCurrency();
	const { convert } = useConvertMoney();
	const totalPeriodFlow = useWalletsPeriodFlow(wallet);
	
	return (
		<div className="mt-[18px] flex items-end gap-5">
			<div>
				<div className="font-numeric text-[10px] uppercase tracking-[0.1em] text-text-3">
					Balance
				</div>
				<MoneyInOriginal
					currency={wallet.balance.currency}
					tone={wallet.balance.amount >= 0 ? 'neutral' : 'neg'}
					size="xl"
					align="start"
					convert={convert}
					format={format}
				>
					{wallet.balance.amount}
				</MoneyInOriginal>
			</div>
			<div className="flex-1" />
			<div>
				<div className="text-[11px] text-text-3">In</div>
				<FinanceMoney tone="pos" size="md">
					{format(totalPeriodFlow.in, wallet.balance.currency)}
				</FinanceMoney>
			</div>
			<div>
				<div className="text-[11px] text-text-3">Out</div>
				<FinanceMoney tone="neg" size="md">
					{format(totalPeriodFlow.out, wallet.balance.currency)}
				</FinanceMoney>
			</div>
		</div>
	);
}

export { WalletBalanceDetails };