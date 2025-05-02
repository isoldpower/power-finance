import type { FC } from "react";

interface TransactionsListPendingProps {
	amount?: number;
}

const TransactionsListPending: FC<TransactionsListPendingProps> = ({
	amount = 3
}) => {
  return (
	<div className="grid gap-4">
		{Array.from({ length: amount }).map((_, index) => (
			<div key={index} className="rounded-lg bg-gray-100 animate-pulse h-20" />
		))}
	</div>
  )
}

TransactionsListPending.displayName = 'TransactionsListPending';

export { TransactionsListPending };
export type { TransactionsListPendingProps };