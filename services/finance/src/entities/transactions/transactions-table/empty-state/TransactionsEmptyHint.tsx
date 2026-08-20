import { Caption } from "@shared/pure-components/typography";

import type { FC, PropsWithChildren } from "react";


type TransactionsEmptyHintProps = PropsWithChildren;

const TransactionsEmptyHint: FC<TransactionsEmptyHintProps> = ({ children }) => (
	<Caption size="xs">
		{children}
	</Caption>
);

TransactionsEmptyHint.displayName = 'TransactionsEmptyHint';

export { TransactionsEmptyHint };
export type { TransactionsEmptyHintProps };
