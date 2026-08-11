import { TransactionsTableHeader } from "@entity/transactions";
import { useConvertMoney } from "@feature/localization";

import type { FC } from "react";


const TransactionsTableColumns: FC = () => {
	const { targetCurrency } = useConvertMoney();

	return (
		<TransactionsTableHeader targetCurrency={targetCurrency} />
	);
};

TransactionsTableColumns.displayName = 'TransactionsTableColumns';

export { TransactionsTableColumns };
