import { RowTitle } from "@shared/pure-components/typography";

import type { FC, PropsWithChildren } from "react";


type TransactionsEmptyTitleProps = PropsWithChildren;

const TransactionsEmptyTitle: FC<TransactionsEmptyTitleProps> = ({ children }) => (
	<RowTitle as="p" tone="muted">
		{children}
	</RowTitle>
);

TransactionsEmptyTitle.displayName = 'TransactionsEmptyTitle';

export { TransactionsEmptyTitle };
export type { TransactionsEmptyTitleProps };
