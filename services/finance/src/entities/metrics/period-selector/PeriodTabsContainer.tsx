import type { FC, ReactNode } from "react";
import { cn } from "@internal/ui-library";

import { Text } from "@shared/pure-components/typography";


interface PeriodTabsContainerProps {
	children: ReactNode;
}

const PeriodTabsContainer: FC<PeriodTabsContainerProps> = ({ children }) => {
	return (
		<Text
			as="div"
			size="12.5"
			weight="semibold"
			className={cn(
				"hidden overflow-hidden rounded-[var(--radius-sm)] border border-border-strong sm:flex",
			)}
		>
			{children}
		</Text>
	);
};

PeriodTabsContainer.displayName = 'PeriodTabsContainer';

export { PeriodTabsContainer };
export type { PeriodTabsContainerProps };
