import { PageTitle } from "@internal/shared";
import { FilterBar } from "@entity/filters";
import { ActiveRangeLabel, CustomRangePicker, PeriodSelector, WalletFilter } from "@widget/filters";

import type { FC } from "react";


interface AnalyticsPageHeaderProps {
	title: string;
}

const AnalyticsPageHeader: FC<AnalyticsPageHeaderProps> = ({ title }) => (
	<div className="flex flex-col gap-3.5">
		<div className="flex flex-wrap items-end justify-between gap-3.5">
			<div className="flex flex-col gap-1">
				<PageTitle>
					{title}
				</PageTitle>
				<ActiveRangeLabel />
			</div>
			<FilterBar>
				<PeriodSelector />
				<CustomRangePicker />
			</FilterBar>
		</div>
		<WalletFilter />
	</div>
);

AnalyticsPageHeader.displayName = 'AnalyticsPageHeader';

export { AnalyticsPageHeader };
export type { AnalyticsPageHeaderProps };
