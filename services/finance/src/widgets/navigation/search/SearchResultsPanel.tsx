import type { FC } from "react";

import { SearchIcon, SearchResultGroup } from "@entity/navigation";
import type { SearchResultRow } from "@entity/navigation";

interface SearchResultsPanelProps {
	isDesktop: boolean;
	value: string;
	onValueChange: (value: string) => void;
	onBlur: () => void;
	pageResults: SearchResultRow[];
	walletResults: SearchResultRow[];
	hasResults: boolean;
	onSelect: (to: string) => void;
}

const SearchResultsPanel: FC<SearchResultsPanelProps> = ({
	isDesktop,
	value,
	onValueChange,
	onBlur,
	pageResults,
	walletResults,
	hasResults,
	onSelect,
}) => (
	<div className="absolute right-0 top-[calc(100%+6px)] z-50 max-h-[360px] w-[320px] max-w-[calc(100vw-32px)] overflow-y-auto rounded-[var(--radius-md)] border border-border-strong bg-popover text-foreground shadow-[var(--shadow-lg)]">
		{!isDesktop ? (
			<div className="flex items-center gap-2 border-b border-border px-3 py-2">
				<SearchIcon />
				<input
					autoFocus
					value={value}
					onChange={(event) => { onValueChange(event.target.value); }}
					onBlur={onBlur}
					placeholder="Search…"
					className="min-w-0 flex-1 border-none bg-transparent text-[13px] text-foreground outline-none placeholder:text-[var(--text-3)]"
				/>
			</div>
		) : null}
		{hasResults ? (
			<>
				<SearchResultGroup heading="Pages" items={pageResults} onSelect={onSelect} />
				<SearchResultGroup heading="Wallets" items={walletResults} onSelect={onSelect} />
			</>
		) : (
			<div className="px-3 py-6 text-center text-[13px] text-text-3">No results found.</div>
		)}
	</div>
);

SearchResultsPanel.displayName = 'SearchResultsPanel';

export { SearchResultsPanel };
export type { SearchResultsPanelProps };
