import { cn, FinanceMenuTrigger } from "@internal/ui-library";
import { textClass } from "@shared/pure-components/typography";

import { FILTER_CONTROL_WIDTH } from "../filter-control.ts";
import { FilterChipCaret } from "./FilterChipCaret.tsx";

import type { FC, PropsWithChildren } from "react";


type FilterChipTriggerProps = PropsWithChildren<{
	active: boolean;
}>;

const FilterChipTrigger: FC<FilterChipTriggerProps> = ({ children, active }) => (
	<FinanceMenuTrigger asChild>
		<button
			type="button"
			className={cn(
				textClass({ size: 'xs', weight: 'semibold' }),
				FILTER_CONTROL_WIDTH,
				"flex items-center justify-between gap-1.5 rounded-[var(--radius-md)] border px-3",
				active
					? "border-[var(--accent-border)] bg-[var(--accent-soft)] text-primary"
					: "border-border-strong text-text-2"
			)}
		>
			<span className="truncate">{children}</span>
			<FilterChipCaret />
		</button>
	</FinanceMenuTrigger>
);

FilterChipTrigger.displayName = 'FilterChipTrigger';

export { FilterChipTrigger };
export type { FilterChipTriggerProps };
