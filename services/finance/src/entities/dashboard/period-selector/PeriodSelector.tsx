import type { FC } from "react";
import { cn } from "@internal/ui-library";

// The selectable comparison periods. Kept as a domain type; the actual list is config supplied
// by the dashboard widget layer.
type Period = '1W' | '1M' | '3M' | '1Y';

interface PeriodSelectorProps {
	periods: readonly Period[];
	value: Period;
	onChange: (period: Period) => void;
	className?: string;
}

const PeriodSelector: FC<PeriodSelectorProps> = ({ periods, value, onChange, className }) => {
	return (
		<div className={cn("hidden overflow-hidden rounded-[var(--radius-sm)] border border-border-strong text-[12.5px] font-semibold sm:flex", className)}>
			{periods.map((period) => (
				<button
					key={period}
					type="button"
					onClick={() => { onChange(period); }}
					className={cn(
						"px-3 py-1.5 transition-colors",
						value === period ? "bg-primary text-white" : "bg-card text-text-3 hover:bg-secondary"
					)}
				>
					{period}
				</button>
			))}
		</div>
	);
};

PeriodSelector.displayName = 'PeriodSelector';

export { PeriodSelector };
export type { PeriodSelectorProps, Period };
