import type { FC, ReactNode } from "react";
import { cn } from "@internal/ui-library";


interface PeriodTabsContainerProps {
	children: ReactNode;
}

const PeriodTabsContainer: FC<PeriodTabsContainerProps> = ({ children }) => {
	return (
		<div className={cn(
			"hidden overflow-hidden rounded-[var(--radius-sm)] border border-border-strong",
			"text-[12.5px] font-semibold sm:flex",
		)}>
			{children}
		</div>
	);
};

PeriodTabsContainer.displayName = 'PeriodTabsContainer';

export { PeriodTabsContainer };
export type { PeriodTabsContainerProps };
