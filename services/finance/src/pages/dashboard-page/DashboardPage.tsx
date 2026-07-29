import type { FC } from "react";

import { MetricsPreferencesProvider } from "@feature/metrics";
import { CurrencySelector } from "@widget/localization";
import { PeriodSelector, LongCurrentDateLabel } from "@widget/metrics";
import { RevealMotion } from "@shared/interactions";
import { PageContainer, MainPageTitle } from "@shared/components";

import { PERIODS } from "./config.ts";


const DashboardPage: FC = () => {
	return (
		<MetricsPreferencesProvider>
			<PageContainer>
				<RevealMotion delay={0.05}>
					<div className='flex flex-wrap justify-between gap-3.5'>
						<div className="flex items-center gap-4">
							<MainPageTitle>Dashboard</MainPageTitle>
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
				{/*<TwoColumnsContainer>*/}
				{/*	<RevealMotion delay={0.12}>*/}
				{/*		<NetWorthHeroWithFx className="h-full" period={search.period} />*/}
				{/*	</RevealMotion>*/}
				{/*	<RevealMotion delay={0.18}>*/}
				{/*		<CashFlowCardWithFx className="h-full" period={search.period} />*/}
				{/*	</RevealMotion>*/}
				{/*</TwoColumnsContainer>*/}
				{/*<RevealMotion delay={0.22}>*/}
				{/*	<LedgerStatusSummary />*/}
				{/*</RevealMotion>*/}
				{/*<RevealMotion delay={0.26}>*/}
				{/*	<NeedsActionPanel />*/}
				{/*</RevealMotion>*/}
				{/*<RevealMotion delay={0.34}>*/}
				{/*	<div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-[1fr_360px]">*/}
				{/*		<RecentActivityPanel className="order-2 lg:order-1" />*/}
				{/*		<QuickAddPanel className="order-1 lg:order-2" />*/}
				{/*	</div>*/}
				{/*</RevealMotion>*/}
			</PageContainer>
		</MetricsPreferencesProvider>
	);
};

DashboardPage.displayName = 'DashboardPage';

export { DashboardPage };
export default DashboardPage;
