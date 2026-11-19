import { cn } from "@internal/ui-library";

import type { FC, ReactNode } from "react";


interface PeriodTabProps {
	selected: boolean;
	onSelect: () => void;
	children: ReactNode;
}

const PeriodTab: FC<PeriodTabProps> = ({ selected, onSelect, children }) => (
	<button
		type="button"
		aria-pressed={selected}
		onClick={onSelect}
		className={cn(
			"px-3 py-1.5 transition-colors",
			selected ? "bg-primary text-white" : "bg-card text-text-3 hover:bg-secondary",
		)}
	>
		{children}
	</button>
);

PeriodTab.displayName = 'PeriodTab';

export { PeriodTab };
export type { PeriodTabProps };
