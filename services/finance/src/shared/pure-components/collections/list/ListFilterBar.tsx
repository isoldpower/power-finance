import { cn } from "@internal/ui-library";
import type { FC } from "react";
import { textClass } from "@shared/pure-components/typography";

interface FilterOption {
	value: string;
	label: string;
}

interface ListFilterBarProps {
	query: string;
	onQueryChange: (value: string) => void;
	placeholder: string;
	filter: string;
	onFilterChange: (value: string) => void;
	options: FilterOption[];
}

const selectClass = cn(textClass({ size: 'xs', weight: 'semibold', tone: 'muted' }), "flex-none cursor-pointer rounded-[var(--radius-md)] border border-border-strong bg-card px-2 py-1.5 outline-none");

const ListFilterBar: FC<ListFilterBarProps> = ({ query, onQueryChange, placeholder, filter, onFilterChange, options }) => (
	<div className="flex items-center gap-2 border-b border-border px-[18px] py-2.5">
		<div className="flex min-w-0 flex-1 items-center gap-2 rounded-[var(--radius-md)] border border-border-strong px-2.5 py-1.5 focus-within:border-[var(--accent-border)]">
			<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--text-3)" strokeWidth="2" strokeLinecap="round">
				<circle cx="11" cy="11" r="7" />
				<line x1="21" y1="21" x2="16.65" y2="16.65" />
			</svg>
			<input
				value={query}
				onChange={(event) => { onQueryChange(event.target.value); }}
				placeholder={placeholder}
				className={cn(textClass({ size: '13' }), "min-w-0 flex-1 border-none bg-transparent outline-none placeholder:text-[var(--text-3)]")}
			/>
		</div>
		<select value={filter} onChange={(event) => { onFilterChange(event.target.value); }} className={selectClass}>
			{options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
		</select>
	</div>
);

ListFilterBar.displayName = 'ListFilterBar';

export { ListFilterBar };
export type { ListFilterBarProps, FilterOption };
