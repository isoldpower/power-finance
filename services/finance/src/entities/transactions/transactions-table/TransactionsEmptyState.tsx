import { Caption, RowTitle, Text } from "@shared/pure-components/typography";

import type { FC } from "react";

const TransactionsEmptyState: FC = () => (
	<div className="flex flex-col items-center justify-center gap-1.5 px-5 py-10 text-center">
		<Text as="div" size="17" tone="subtle" className="flex size-[38px] items-center justify-center rounded-[10px] border border-dashed border-border-strong">⌕</Text>
		<RowTitle as="p" tone="muted">No matching transactions</RowTitle>
		<Caption size="xs">Try a different search or clear your filters.</Caption>
	</div>
);

TransactionsEmptyState.displayName = 'TransactionsEmptyState';

export { TransactionsEmptyState };
