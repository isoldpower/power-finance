import {FC, useMemo} from "react";

import type { Transaction } from "@entity/transaction";
import {useSettingsContext} from "@internal/shared";
import {TransferTransaction} from "@widget/transaction/recent-transaction/TransferTransaction.tsx";
import {ExpenseTransaction} from "@widget/transaction/recent-transaction/ExpenseTransaction.tsx";
import {IncomeTransaction} from "@widget/transaction/recent-transaction/IncomeTransaction.tsx";
import {AdjustTransaction} from "@widget/transaction/recent-transaction/AdjustTransaction.tsx";


interface RecentTransactionProps {
	transaction: Transaction | null;
}

const useLocaleDate = (date: string) => {
	const { locale } = useSettingsContext();

	return useMemo(() => {
		const dateFormat = new Date(date);

		return new Intl.DateTimeFormat(locale, {
			month: 'short',
			day: 'numeric',
			year: 'numeric'
		}).format(dateFormat);
	}, [locale, date]);
}

const RecentTransaction: FC<RecentTransactionProps> = ({
	transaction: passedTransaction
}) => {
	if (!passedTransaction) return null;

	return (
		<>
			{passedTransaction.type === 'transfer' && (
				<TransferTransaction transaction={passedTransaction} />
			)}
			{passedTransaction.type === 'expense' && (
				<ExpenseTransaction transaction={passedTransaction} />
			)}
			{passedTransaction.type === 'income' && (
				<IncomeTransaction transaction={passedTransaction} />
			)}
			{passedTransaction.type === 'adjust' && (
				<AdjustTransaction transaction={passedTransaction} />
			)}
		</>
	);
}

export { RecentTransaction };