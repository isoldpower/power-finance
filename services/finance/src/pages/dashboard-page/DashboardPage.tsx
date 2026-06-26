import type { FC } from "react";

import {
	NetWorthHero,
	CashFlowCard,
	LedgerStatusBar,
	NeedsActionPanel,
	RecentActivityPanel,
	QuickAddPanel,
} from "@widget/dashboard";


const DashboardPage: FC = () => {
	return (
		<div className="mx-auto flex max-w-[1320px] flex-col gap-4 px-[22px] pb-[70px] pt-[22px]">
			<div className="flex flex-wrap items-center gap-3.5">
				<h1 className="font-display text-2xl font-semibold tracking-[-0.01em]">Dashboard</h1>
				<span className="hidden font-numeric text-[11px] uppercase tracking-[0.08em] text-text-3 sm:block">
					Your financial overview
				</span>
			</div>

			<div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.15fr_1fr]">
				<NetWorthHero />
				<CashFlowCard />
			</div>

			<LedgerStatusBar />

			<NeedsActionPanel />

			<div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-[1fr_360px]">
				<RecentActivityPanel />
				<QuickAddPanel />
			</div>
		</div>
	);
};

DashboardPage.displayName = 'DashboardPage';

export { DashboardPage };
export default DashboardPage;
