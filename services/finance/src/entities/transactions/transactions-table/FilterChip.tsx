import type { FC, ReactNode } from "react";
import {
	cn,
	FinanceMenu,
	FinanceMenuTrigger,
	FinanceMenuContent,
	FinanceMenuItem,
} from "@internal/ui-library";
import { Caption, textClass } from "@shared/pure-components/typography";

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
					textClass({ size: 'xs', weight: 'semibold' }),
					"flex items-center gap-1.5 rounded-[var(--radius-md)] border px-3 py-2",
					active ? "border-[var(--accent-border)] bg-[var(--accent-soft)] text-primary" : "border-border-strong text-text-2"
				)}
			>
				{label} <Caption as="span" size="9">▾</Caption>
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
