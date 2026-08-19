import { useCallback } from "react";
import { cn } from "@internal/ui-library";
import { textClass } from "@shared/pure-components/typography";
import { SearchIcon } from "@shared/pure-components/icons";

import type { ChangeEvent, FC } from "react";


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

const ListFilterBar: FC<ListFilterBarProps> = ({ query, onQueryChange, placeholder, filter, onFilterChange, options }) => {
	const handleInputChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
		onQueryChange(event.target.value);
	}, [onQueryChange]);

	const handleFilterChange = useCallback((event: ChangeEvent<HTMLSelectElement>) => {
		onFilterChange(event.target.value);
	}, [onFilterChange]);
	
	return (
		<div className={cn("flex items-center gap-2 border-b border-border px-[18px] py-2.5")}>
			<div
				className={cn(
					"flex min-w-0 flex-1 items-center gap-2 rounded-[var(--radius-md)]",
					"border border-border-strong px-2.5 py-1.5 focus-within:border-[var(--accent-border)]"
				)}
			>
				<SearchIcon />
				<input
					value={query}
					onChange={handleInputChange}
					placeholder={placeholder}
					className={cn(
						textClass({size: '13'}),
						"min-w-0 flex-1 border-none bg-transparent outline-none placeholder:text-[var(--text-3)]"
					)}
				/>
			</div>
			<select
				value={filter}
				onChange={handleFilterChange}
				className={cn(
					textClass({ size: 'xs', weight: 'semibold', tone: 'muted' }),
					"flex-none cursor-pointer rounded-[var(--radius-md)]",
					"border border-border-strong bg-card px-2 py-1.5 outline-none"
				)}
			>
				{options.map((option) => (
					<option key={option.value} value={option.value}>
						{option.label}
					</option>
				))}
			</select>
		</div>
	);
}

ListFilterBar.displayName = 'ListFilterBar';

export { ListFilterBar };
export type { ListFilterBarProps, FilterOption };
