import type { FC } from "react";

interface TransactionsListErrorProps {
	amount?: number;
}

const TransactionsListError: FC<TransactionsListErrorProps> = ({
	amount = 3
}) => {
  return (
	<div className="grid gap-4">
		{Array.from({ length: amount }).map((_, index) => (
			<div key={`transaction-error-${index.toString()}`} className="rounded-lg bg-red-300 h-20" />
		))}
	</div>
  )
}

TransactionsListError.displayName = 'TransactionsListError';

export { TransactionsListError };
export type { TransactionsListErrorProps };