import type { FC } from "react";

const TransactionsEmptyState: FC = () => (
	<div className="flex flex-col items-center justify-center gap-1.5 px-5 py-10 text-center">
		<div className="flex size-[38px] items-center justify-center rounded-[10px] border border-dashed border-border-strong text-[17px] text-text-3">⌕</div>
		<div className="text-[13.5px] font-semibold text-text-2">No matching transactions</div>
		<div className="text-xs text-text-3">Try a different search or clear your filters.</div>
	</div>
);

TransactionsEmptyState.displayName = 'TransactionsEmptyState';

export { TransactionsEmptyState };
