import type { FC } from "react";
import { useMemo, useState } from "react";
import { useSettingsContext } from "@internal/shared";

import {
	NetWorthHero,
	CashFlowCard,
	LedgerStatusBar,
	NeedsActionPanel,
	RecentActivityPanel,
	QuickAddPanel,
	CurrencySelector,
	PERIODS,
} from "@widget/dashboard";
import { PeriodSelector } from "@entity/dashboard";
import type { Period } from "@entity/dashboard";


const DashboardPage: FC = () => {
	const [period, setPeriod] = useState<Period>('1M');
	const { locale } = useSettingsContext();

	const dateLabel = useMemo(() => {
		const now = new Date();
		const weekday = now.toLocaleDateString(locale, { weekday: 'short' }).toUpperCase();
		const month = now.toLocaleDateString(locale, { month: 'short' }).toUpperCase();
		return `${weekday} · ${month} ${now.getDate().toString()} · ${now.getFullYear().toString()}`;
	}, [locale]);

	return (
		<div className="mx-auto flex max-w-[1320px] flex-col gap-4 px-[22px] pb-[70px] pt-[22px]">
			<div className="fx-rise [animation-delay:0.05s] flex flex-wrap items-center gap-3.5">
				<h1 className="font-display text-2xl font-semibold tracking-[-0.01em]">Dashboard</h1>
				<span className="font-numeric text-[11px] uppercase tracking-[0.08em] text-text-3">
					{dateLabel}
				</span>
				<div className="flex-1" />
				<PeriodSelector periods={PERIODS} value={period} onChange={setPeriod} />
				<CurrencySelector />
			</div>

			<div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.15fr_1fr]">
				<NetWorthHero range={period} className="fx-rise [animation-delay:0.12s]" />
				<CashFlowCard range={period} className="fx-rise [animation-delay:0.18s]" />
			</div>

			<LedgerStatusBar className="fx-rise [animation-delay:0.22s]" />

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
