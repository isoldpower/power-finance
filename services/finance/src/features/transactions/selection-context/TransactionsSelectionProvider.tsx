import { useMemo } from "react";

import { createTransactionsSelectionStore } from "./selection-store.ts";
import { TransactionsSelectionReactContext } from "./context.ts";

import type { FC, PropsWithChildren } from "react";
import type { TransactionsSelection } from "./types.ts";


type TransactionsSelectionProviderProps = PropsWithChildren<Partial<TransactionsSelection>>;

const TransactionsSelectionProvider: FC<TransactionsSelectionProviderProps> = ({
	children,
	...initialValue
}) => {
	const zustandStore = useMemo(() => {
		return createTransactionsSelectionStore(initialValue);
	}, [initialValue]);

	return (
		<TransactionsSelectionReactContext value={zustandStore}>
			{children}
		</TransactionsSelectionReactContext>
	);
}

export { TransactionsSelectionProvider };
