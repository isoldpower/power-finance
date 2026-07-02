import type { FC } from "react";

interface SearchResultRow {
	key: string;
	label: string;
	meta: string;
	to: string;
}

interface SearchResultGroupProps {
	heading: string;
	items: SearchResultRow[];
	onSelect: (to: string) => void;
}

const SearchResultGroup: FC<SearchResultGroupProps> = ({ heading, items, onSelect }) => (
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

SearchResultGroup.displayName = 'SearchResultGroup';

export { SearchResultGroup };
export type { SearchResultGroupProps, SearchResultRow };
