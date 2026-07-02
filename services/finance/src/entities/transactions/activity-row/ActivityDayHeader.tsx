import type { FC } from "react";
import { FinanceMoney } from "@internal/ui-library";

interface ActivityDayHeaderProps {
	label: string;
	sumFormatted: string;
	positive: boolean;
}

const ActivityDayHeader: FC<ActivityDayHeaderProps> = ({ label, sumFormatted, positive }) => (
	<div className="flex items-center justify-between border-b border-border bg-secondary px-[18px] py-2.5">
		<span className="font-numeric text-[10px] uppercase tracking-[0.1em] text-text-3">{label}</span>
		<FinanceMoney tone={positive ? 'pos' : 'neg'} size="sm">
			{sumFormatted}
		</FinanceMoney>
	</div>
);

ActivityDayHeader.displayName = 'ActivityDayHeader';

export { ActivityDayHeader };
export type { ActivityDayHeaderProps };
