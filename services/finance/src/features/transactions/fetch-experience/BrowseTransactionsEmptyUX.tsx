import { Icons } from "@internal/ui-library";
import { TransactionsEmptyState } from "@entity/transactions";

import type { FC, PropsWithChildren } from "react";


type BrowseTransactionsEmptyUXProps = PropsWithChildren<{
	dataset: unknown[];
}>;

const BrowseTransactionsEmptyUX: FC<BrowseTransactionsEmptyUXProps> = ({ dataset, children }) => {
	if (dataset.length === 0) {
		return (
			<TransactionsEmptyState>
				<TransactionsEmptyState.Icon>
					<Icons.CircleOff size={10} />
				</TransactionsEmptyState.Icon>
				<TransactionsEmptyState.Title>
					No matching transactions
				</TransactionsEmptyState.Title>
				<TransactionsEmptyState.Hint>
					Try a different search or clear your filters.
				</TransactionsEmptyState.Hint>
			</TransactionsEmptyState>
		);
	}

	return children;
};

BrowseTransactionsEmptyUX.displayName = 'BrowseTransactionsEmptyUX';

export { BrowseTransactionsEmptyUX };
export type { BrowseTransactionsEmptyUXProps };
