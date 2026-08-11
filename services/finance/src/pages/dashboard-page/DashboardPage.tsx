import type { FC } from "react";

import { QuickAddPanel, RecentActivityPanel } from "@process/transactions";
import { CashFlowWithFx, NetWorthHeroWithFx } from "@process/metrics";
import { LedgerStatusSummary } from "@process/accounts";
import { NeedsActionPanel } from "@process/assistance";
import { CurrencySelector } from "@widget/localization";
import { PeriodSelector, LongCurrentDateLabel } from "@widget/metrics";
import { MetricsPreferencesProvider } from "@feature/metrics";
import { RevealMotion } from "@shared/motion";
import { PageContainer, SidebarColumnsContainer, TwoColumnsContainer } from "@shared/pure-components/layout";
import { PageTitle } from "@shared/pure-components/typography";

import { PERIODS } from "./config";


const DashboardPage: FC = () => {
	return (
		<MetricsPreferencesProvider>
			<PageContainer>
				<RevealMotion delay={0.1}>
					<div className='flex flex-wrap justify-between gap-3.5'>
						<div className="flex items-center gap-4">
							<PageTitle>Dashboard</PageTitle>
							<LongCurrentDateLabel />
						</div>
						<div className="flex items-center gap-2">
							<PeriodSelector fullList={PERIODS} />
							<div className="w-18">
								<CurrencySelector pivot='end' />
							</div>
						</div>
					</div>
				</RevealMotion>
				<TwoColumnsContainer>
					<RevealMotion delay={0.1}>
						<NetWorthHeroWithFx className="h-full" />
					</RevealMotion>
					<RevealMotion delay={0.1}>
						<CashFlowWithFx className="h-full" />
					</RevealMotion>
				</TwoColumnsContainer>
				<RevealMotion delay={0.1}>
					<LedgerStatusSummary />
				</RevealMotion>
				<RevealMotion delay={0.1}>
					<NeedsActionPanel />
				</RevealMotion>
				<RevealMotion delay={0.1}>
					<SidebarColumnsContainer>
						<RecentActivityPanel className="order-2 lg:order-1" />
						<QuickAddPanel className="order-1 lg:order-2" />
					</SidebarColumnsContainer>
				</RevealMotion>
			</PageContainer>
		</MetricsPreferencesProvider>
	);
};

DashboardPage.displayName = 'DashboardPage';

export { DashboardPage };
export default DashboardPage;
