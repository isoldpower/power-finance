import { cn, FinanceComboboxTrigger } from "@internal/ui-library";
import { textClass } from "@shared/pure-components/typography";

import { FILTER_CONTROL_WIDTH } from "../filter-control.ts";

import type { FC, PropsWithChildren } from "react";


type FilterComboboxTriggerProps = PropsWithChildren<{
	active: boolean;
}>;

const FilterComboboxTrigger: FC<FilterComboboxTriggerProps> = ({ children, active }) => (
	<FinanceComboboxTrigger
		className={cn(
			textClass({ size: 'xs', weight: 'semibold' }),
			FILTER_CONTROL_WIDTH,
			"rounded-[var(--radius-md)] bg-transparent px-3 py-0",
			active
				? "border-[var(--accent-border)] bg-[var(--accent-soft)] text-primary"
				: "border-border-strong text-text-2"
		)}
	>
		<span className="truncate">{children}</span>
	</FinanceComboboxTrigger>
);

FilterComboboxTrigger.displayName = 'FilterComboboxTrigger';

export { FilterComboboxTrigger };
export type { FilterComboboxTriggerProps };
