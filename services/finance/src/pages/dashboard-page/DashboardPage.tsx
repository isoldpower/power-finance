import type { FC } from "react";

import { useSearchProtected } from "@feature/navigation";
import { QuickAddPanel, RecentActivityPanel } from "@process/transactions";
import { CurrencySelector } from "@widget/localization";
import { PeriodSelector, LongCurrentDateLabel } from "@widget/metrics";
import { NetWorthHeroWithFx, CashFlowCardWithFx, LedgerStatusSummary } from "@process/metrics";
import { NeedsActionPanel } from "@process/assistance";
import { RevealMotion } from "@shared/interactions";
import { PageContainer, MainPageTitle, TwoColumnsContainer } from "@shared/components";

import { searchSchema } from "./searchSchema.ts";
import type { DashboardSearchSchema } from "./searchSchema.ts";


const DashboardPage: FC = () => {
	const [search, setSearch] = useSearchProtected<DashboardSearchSchema>(searchSchema);

	return (
		<PageContainer>
			<RevealMotion delay={0.05} className="flex flex-wrap items-center gap-3.5">
				<MainPageTitle>
					Dashboard
				</MainPageTitle>
				<LongCurrentDateLabel />
				<div className="flex-1" />
				<PeriodSelector
					period={search.period}
					onPeriodChange={setSearch} />
				<CurrencySelector />
			</RevealMotion>
			<TwoColumnsContainer>
				<RevealMotion delay={0.12}>
					<NetWorthHeroWithFx className="h-full" period={search.period} />
				</RevealMotion>
				<RevealMotion delay={0.18}>
					<CashFlowCardWithFx className="h-full" period={search.period} />
				</RevealMotion>
			</TwoColumnsContainer>
			<RevealMotion delay={0.22}>
				<LedgerStatusSummary />
			</RevealMotion>
			<RevealMotion delay={0.26}>
				<NeedsActionPanel />
			</RevealMotion>
			<RevealMotion delay={0.34} className="grid grid-cols-1 items-start gap-4 lg:grid-cols-[1fr_360px]">
				<RecentActivityPanel className="order-2 lg:order-1" />
				<QuickAddPanel className="order-1 lg:order-2" />
			</RevealMotion>
		</PageContainer>
	);
};

DashboardPage.displayName = 'DashboardPage';

export { DashboardPage };
export default DashboardPage;
