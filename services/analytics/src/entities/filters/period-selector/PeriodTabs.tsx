import { cn } from "@internal/ui-library";
import { Text } from "@internal/shared";
import { PeriodTab } from "./tabs/PeriodTab.tsx";

import type { FC, PropsWithChildren } from "react";
import type { PeriodTabProps } from "./tabs/PeriodTab.tsx";


type PeriodTabsProps = PropsWithChildren<{
	label: string;
}>;
type PeriodTabsObject = FC<PeriodTabsProps> & {
	Tab: FC<PeriodTabProps>;
};

const PeriodTabs: PeriodTabsObject = ({ label, children }) => (
	<Text
		as="div"
		size="12.5"
		weight="semibold"
		role="group"
		aria-label={label}
		className={cn("flex overflow-hidden rounded-[var(--radius-sm)] border border-border-strong")}
	>
		{children}
	</Text>
);

PeriodTabs.Tab = PeriodTab;
PeriodTabs.displayName = 'PeriodTabs';

export { PeriodTabs };
export type { PeriodTabsProps };
