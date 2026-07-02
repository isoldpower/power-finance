import type { FC } from "react";


interface TransactionsListPendingProps {
	amount?: number;
}

const TransactionsListPending: FC<TransactionsListPendingProps> = ({
	amount = 3
}) => {
  return (
		<div className="flex flex-col gap-2">
			<div className="bg-white rounded-lg overflow-hidden border border-gray-200 dark:border-gray-800 animate-pulse">
				{Array.from({ length: amount }).map((_, index) => (
					<div 
						key={`transaction-pending-${index.toString()}`}
						className="border-b last:border-b-0 bg-gray-50 dark:bg-gray-900 h-18" />
				))}
			</div>
		</div>
  )
}

TransactionsListPending.displayName = 'TransactionsListPending';

export { TransactionsListPending };
export type { TransactionsListPendingProps };