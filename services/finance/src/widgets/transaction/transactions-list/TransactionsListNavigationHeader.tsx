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
			<h2 className="text-xl font-bold">
				Recent Transactions <span className="text-gray-400">
				{ status === 'pending' && "..."}
			</span>
			</h2>
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