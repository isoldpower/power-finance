import { Skeleton } from "@internal/ui-library";
import type { FC } from "react";


interface TransactionsListPendingProps {
	amount?: number;
}

const TransactionsListPending: FC<TransactionsListPendingProps> = ({
	amount = 3
}) => {
  return (
		<div className="flex flex-col gap-2">
 			<Skeleton className="h-6 w-60 text-sm font-medium text-gray-500" />
			<div className="bg-white rounded-lg overflow-hidden border border-gray-200">
				{Array.from({ length: amount }).map((_, index) => (
					<div key={index} className="border-b last:border-b-0 bg-gray-50 animate-pulse h-18" />
				))}
			</div>
		</div>
  )
}

TransactionsListPending.displayName = 'TransactionsListPending';

export { TransactionsListPending };
export type { TransactionsListPendingProps };