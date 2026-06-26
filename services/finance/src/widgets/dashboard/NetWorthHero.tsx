import type { FC } from "react";
import { FinanceCard, FinanceMoney } from "@internal/ui-library";

// TODO wire to backend
const MOCK_NET_WORTH = {
	value: "$18,240.30",
	deltaPct: "+2.4%",
	deltaAmount: "+$428.10",
	comparison: "vs last 30 days",
	sparkStroke: "M0 96 L52 88 L104 92 L156 70 L208 76 L260 54 L312 60 L364 38 L416 44 L468 24 L520 18",
	sparkFill: "M0 96 L52 88 L104 92 L156 70 L208 76 L260 54 L312 60 L364 38 L416 44 L468 24 L520 18 L520 120 L0 120 Z",
};

const NetWorthHero: FC = () => {
	return (
		<FinanceCard className="relative overflow-hidden px-6 py-[22px]">
			<div className="pointer-events-none absolute -right-[50px] -top-[70px] size-[260px] rounded-full bg-[radial-gradient(circle,var(--glow),transparent_68%)]" />
			<div className="relative">
				<div className="font-numeric text-[11px] uppercase tracking-[0.14em] text-text-3">
					Total net worth
				</div>
				<div className="mt-2.5 flex items-end gap-3.5">
					<FinanceMoney size="display" className="leading-[0.95]">{MOCK_NET_WORTH.value}</FinanceMoney>
					<span className="mb-1.5 rounded-[var(--radius)] bg-pos-soft px-2 py-0.5 text-[13px] font-bold text-pos">
						{MOCK_NET_WORTH.deltaPct}
					</span>
				</div>
				<div className="mt-2 text-[13px] text-text-2">
					{MOCK_NET_WORTH.deltaAmount} <span className="text-text-3">{MOCK_NET_WORTH.comparison}</span>
				</div>
				<svg viewBox="0 0 520 120" preserveAspectRatio="none" className="mt-3.5 block h-[92px] w-full overflow-visible">
					<defs>
						<linearGradient id="netWorthSpark" x1="0" y1="0" x2="0" y2="1">
							<stop offset="0%" stopColor="var(--primary)" stopOpacity="0.22" />
							<stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
						</linearGradient>
					</defs>
					<path d={MOCK_NET_WORTH.sparkFill} fill="url(#netWorthSpark)" />
					<path d={MOCK_NET_WORTH.sparkStroke} fill="none" stroke="var(--primary)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
					<circle cx="520" cy="18" r="4" fill="var(--primary)" stroke="var(--surface)" strokeWidth="2" />
				</svg>
			</div>
		</FinanceCard>
	);
};

NetWorthHero.displayName = 'NetWorthHero';

export { NetWorthHero };
