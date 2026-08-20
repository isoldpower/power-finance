import { TransactionsTableHeader } from "@entity/transactions";
import { useConvertMoney } from "@feature/localization";

import type { FC } from "react";


const TransactionsTableColumns: FC = () => {
	const { targetCurrency } = useConvertMoney();

	return (
		<TransactionsTableHeader>
			<TransactionsTableHeader.SelectCell />
			<TransactionsTableHeader.DateCell>
				Date
			</TransactionsTableHeader.DateCell>
			<TransactionsTableHeader.Description>
				Description
			</TransactionsTableHeader.Description>
			<TransactionsTableHeader.Wallet>
				Wallet
			</TransactionsTableHeader.Wallet>
			<TransactionsTableHeader.Category>
				Category
			</TransactionsTableHeader.Category>
			<TransactionsTableHeader.Amount>
				Amount
			</TransactionsTableHeader.Amount>
			<TransactionsTableHeader.ConvertedAmount>
				{targetCurrency}
			</TransactionsTableHeader.ConvertedAmount>
			<TransactionsTableHeader.Chevron />
		</TransactionsTableHeader>
	);
};

TransactionsTableColumns.displayName = 'TransactionsTableColumns';

export { TransactionsTableColumns };
