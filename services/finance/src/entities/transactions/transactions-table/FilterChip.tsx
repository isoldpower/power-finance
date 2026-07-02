import type { FC, ReactNode } from "react";
import {
	cn,
	FinanceMenu,
	FinanceMenuTrigger,
	FinanceMenuContent,
	FinanceMenuItem,
} from "@internal/ui-library";

interface FilterChipProps {
	label: ReactNode;
	active: boolean;
	options: { value: string; label: string }[];
	onSelect: (value: string) => void;
}

const FilterChip: FC<FilterChipProps> = ({ label, active, options, onSelect }) => (
	<FinanceMenu>
		<FinanceMenuTrigger asChild>
			<button
				type="button"
				className={cn(
					"flex items-center gap-1.5 rounded-[var(--radius-md)] border px-3 py-2 text-xs font-semibold",
					active ? "border-[var(--accent-border)] bg-[var(--accent-soft)] text-primary" : "border-border-strong text-text-2"
				)}
			>
				{label} <span className="text-[9px] text-text-3">▾</span>
			</button>
		</FinanceMenuTrigger>
		<FinanceMenuContent align="start" className="min-w-44">
			{options.map((option) => (
				<FinanceMenuItem key={option.value} onClick={() => { onSelect(option.value); }}>
					{option.label}
				</FinanceMenuItem>
			))}
		</FinanceMenuContent>
	</FinanceMenu>
);

FilterChip.displayName = 'FilterChip';

export { FilterChip };
export type { FilterChipProps };
