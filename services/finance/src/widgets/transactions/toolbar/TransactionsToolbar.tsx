import type { FC } from "react";

import { FilterChip, TransactionSearchInput } from "@entity/transactions";

interface ToolbarFilterOption {
	value: string;
	label: string;
}

interface TransactionsToolbarProps {
	query: string;
	setQuery: (value: string) => void;
	walletLabel: string;
	walletActive: boolean;
	onWallet: (value: string) => void;
	walletOptions: ToolbarFilterOption[];
	typeLabel: string;
	typeActive: boolean;
	onType: (value: string) => void;
	typeOptions: ToolbarFilterOption[];
	sortLabel: string;
	sortActive: boolean;
	onSort: (value: string) => void;
	sortOptions: ToolbarFilterOption[];
}

const TransactionsToolbar: FC<TransactionsToolbarProps> = ({
	query,
	setQuery,
	walletLabel,
	walletActive,
	onWallet,
	walletOptions,
	typeLabel,
	typeActive,
	onType,
	typeOptions,
	sortLabel,
	sortActive,
	onSort,
	sortOptions,
}) => {
	return (
		<div className="flex flex-wrap items-center gap-2 border-b border-border p-3">
			<TransactionSearchInput value={query} onValueChange={setQuery} onClear={() => { setQuery(''); }} />
			<FilterChip label={walletLabel} active={walletActive} onSelect={onWallet} options={walletOptions} />
			<FilterChip label={typeLabel} active={typeActive} onSelect={onType} options={typeOptions} />
			<FilterChip label={`Sort: ${sortLabel}`} active={sortActive} onSelect={onSort} options={sortOptions} />
		</div>
	);
};

TransactionsToolbar.displayName = 'TransactionsToolbar';

export { TransactionsToolbar };
export type { TransactionsToolbarProps };
