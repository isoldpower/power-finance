import type { FC } from "react";

import { SearchIcon } from "./SearchIcon.tsx";

interface SearchResultRow {
	key: string;
	label: string;
	meta: string;
	to: string;
}

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

const Group: FC<{ heading: string; items: SearchResultRow[]; onSelect: (to: string) => void }> = ({ heading, items, onSelect }) => (
	items.length > 0 ? (
		<div className="p-1">
			<div className="px-2 pb-1 pt-1.5 font-numeric text-[9.5px] uppercase tracking-[0.1em] text-text-3">{heading}</div>
			{items.map((item) => (
				<button
					key={item.key}
					type="button"
					onMouseDown={(event) => { event.preventDefault(); onSelect(item.to); }}
					className="flex w-full items-center gap-2 rounded-[var(--radius-sm)] px-2 py-2 text-left text-[13px] hover:bg-secondary"
				>
					<span className="font-medium">{item.label}</span>
					<span className="ml-auto truncate pl-2 font-numeric text-[11px] text-text-3">{item.meta}</span>
				</button>
			))}
		</div>
	) : null
);

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
				<Group heading="Pages" items={pageResults} onSelect={onSelect} />
				<Group heading="Wallets" items={walletResults} onSelect={onSelect} />
			</>
		) : (
			<div className="px-3 py-6 text-center text-[13px] text-text-3">No results found.</div>
		)}
	</div>
);

SearchResultsPanel.displayName = 'SearchResultsPanel';

export { SearchResultsPanel };
export type { SearchResultsPanelProps, SearchResultRow };
