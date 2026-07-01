import type { FC } from "react";

import {
	RecentActivityPanel,
	QuickAddPanel,
	CurrencySelector,
	PeriodSelector,
} from "@widget/dashboard";
import { searchSchema } from "./searchSchema.ts";
import { LongDateLabel } from "@entity/dashboard/date-label/LongDateLabel.tsx";
import { MainTitle } from "@entity/dashboard/typography/MainTitle.tsx";
import { NetWorthHeroWithFx } from "@process/dashboard/net-worth/NetWorthWithFx.tsx";
import { CashFlowCardWithFx } from "@process/dashboard/cash-flow/CashFlowWithFx.tsx";
import type { DashboardSearchSchema } from "./searchSchema.ts";
import {LedgerStatusSummary} from "@process/dashboard/ledger-status/LedgerStatusSummary.tsx";
import {NeedsActionPanel} from "@process/dashboard/ledger-status/NeedsActionPanel.tsx";
import {useSearchProtected} from "@feature/navigation";


const DashboardPage: FC = () => {
	const [search, setSearch] = useSearchProtected<DashboardSearchSchema>(searchSchema);

	return (
		<div className="mx-auto flex max-w-[1320px] flex-col gap-4 px-[22px] pb-[70px] pt-[22px]">
			<div className="fx-rise [animation-delay:0.05s] flex flex-wrap items-center gap-3.5">
				<MainTitle>Dashboard</MainTitle>
				<LongDateLabel />
				<div className="flex-1" />
				<PeriodSelector
					period={search.period}
					onPeriodChange={setSearch}  />
				<CurrencySelector />
			</div>
			<div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.15fr_1fr]">
				<NetWorthHeroWithFx 
					period={search.period} 
					className="fx-rise [animation-delay:0.12s]" />
				<CashFlowCardWithFx
					period={search.period}
					className="fx-rise [animation-delay:0.18s]" />
			</div>
			<div className="fx-rise [animation-delay:0.22s]">
				<LedgerStatusSummary />	
			</div>
			<NeedsActionPanel className="fx-rise [animation-delay:0.26s]" />
			<div className="fx-rise [animation-delay:0.34s] grid grid-cols-1 items-start gap-4 lg:grid-cols-[1fr_360px]">
				<RecentActivityPanel className="order-2 lg:order-1" />
				<QuickAddPanel className="order-1 lg:order-2" />
			</div>
		</div>
	);
};

DashboardPage.displayName = 'DashboardPage';

export { DashboardPage };
export default DashboardPage;
