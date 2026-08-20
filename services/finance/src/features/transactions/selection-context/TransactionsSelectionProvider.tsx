import { useState } from "react";
import { createTransactionsSelectionStore } from "./selection-store.ts";
import { TransactionsSelectionReactContext } from "./context.ts";

import type { FC, PropsWithChildren } from "react";
import type { TransactionsSelection } from "./types.ts";


type TransactionsSelectionProviderProps = PropsWithChildren<Partial<TransactionsSelection>>;

const TransactionsSelectionProvider: FC<TransactionsSelectionProviderProps> = ({
	children,
	...initialValue
}) => {
	const [zustandStore] = useState(() => {
		return createTransactionsSelectionStore(initialValue);
	});

	return (
		<TransactionsSelectionReactContext value={zustandStore}>
			{children}
		</TransactionsSelectionReactContext>
	);
}

export { TransactionsSelectionProvider };
