import { Link } from "@tanstack/react-router";
import { getFinanceRoute } from "@internal/shared";
import { Button, Icons } from "@internal/ui-library";
import type { FC } from "react";

import { useTransactionsList } from "@feature/transaction";


type TransactionsListNavigationHeaderProps = object;

const TransactionsListNavigationHeader: FC<TransactionsListNavigationHeaderProps> = () => {
	const { status } = useTransactionsList();

	return (
		<div className="flex justify-between items-center mb-4">
			<div className="flex flex-col">
				<h2 className="text-xl font-bold">
					Recent Transactions <span className="text-silent">
						{ status === 'pending' && "..."}
					</span>
				</h2>
				<p className="text-silent">
					For the last 7 days
					</p>
			</div>
			<Button variant="link" asChild>
				<Link to={getFinanceRoute('transactions')} className="text-sm flex items-center">
					View all
					<Icons.ChevronRight size={16} className="ml-1" />
				</Link>
			</Button>
		</div>
	)
}

TransactionsListNavigationHeader.displayName = 'TransactionsListNavigationHeader';

export { TransactionsListNavigationHeader };
export type { TransactionsListNavigationHeaderProps };