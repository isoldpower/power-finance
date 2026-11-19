import { categoryLabel } from "@entity/spending";
import { TransactionList, TransactionRow } from "@entity/transactions";
import { ProtectNoTransactions, ShowOnConvertedAmount } from "@feature/transactions";
import { ChartMessage } from "@shared/charts";
import { useDateFormat, useMoneyFormat } from "@shared/formatting";
import { DotList } from "@shared/text";
import { DRILL_EMPTY_HEIGHT, DRILL_ROW_STAGGER_MS } from "./config.ts";

import type { FC } from "react";
import type { DrillTransactions } from "@entity/transactions";


interface DrillTransactionsListProps {
	transactions: DrillTransactions;
}

const DrillTransactionsList: FC<DrillTransactionsListProps> = ({ transactions }) => {
	const formatMoney = useMoneyFormat();
	const { formatDateTime } = useDateFormat();

	return (
		<ProtectNoTransactions
			transactions={transactions}
			empty={(
				<ChartMessage
					height={DRILL_EMPTY_HEIGHT}
					title="No transactions"
					detail="Nothing matches this selection"
				/>
			)}
		>
			<TransactionList label="Transactions">
				{transactions.transactions.map((transaction, index) => (
					<TransactionRow
						key={transaction.id}
						color={transaction.wallet.color}
						delay={index * DRILL_ROW_STAGGER_MS}
					>
						<TransactionRow.Title
							name={transaction.name}
							caption={(
								<DotList>
									{formatDateTime(transaction.createdAt)}
									{categoryLabel(transaction.category)}
									{transaction.wallet.name}
								</DotList>
							)}
						/>
						<TransactionRow.Amount
							income={transaction.side === 'income'}
							amount={formatMoney(transaction.converted)}
						>
							<ShowOnConvertedAmount transaction={transaction}>
								<TransactionRow.Native>
									{formatMoney(transaction.money)}
								</TransactionRow.Native>
							</ShowOnConvertedAmount>
						</TransactionRow.Amount>
					</TransactionRow>
				))}
			</TransactionList>
		</ProtectNoTransactions>
	);
};

DrillTransactionsList.displayName = 'DrillTransactionsList';

export { DrillTransactionsList };
export type { DrillTransactionsListProps };
