import type { FC } from "react";
import { FinanceBadge } from "@internal/ui-library";

const WhatIfCard: FC = () => {
	return (
		<div className="relative overflow-hidden rounded-[var(--radius-lg)] border border-dashed border-[var(--accent-border)] bg-[var(--accent-soft)] px-5 py-[18px]">
			<div className="mb-2.5 flex items-center gap-2.5">
				<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
					<path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0H5a2 2 0 0 1-2-2v-4m6 6h10a2 2 0 0 0 2-2v-4" />
				</svg>
				<span className="text-[14.5px] font-semibold">Draft / What-if mode</span>
				<FinanceBadge tone="warn" appearance="soft" size="sm">SOON</FinanceBadge>
			</div>
			<p className="max-w-[520px] text-[13px] leading-relaxed text-text-2">
				Branch your finances into a sandbox: change incomes, expenses or goals and watch runway,
				savings rate and goal ETAs update — without touching real data.
			</p>
			<div className="mt-3.5 flex items-center gap-2.5 rounded-[var(--radius-md)] border border-border bg-card px-3.5 py-2.5">
				<FinanceBadge tone="accent" appearance="soft" size="sm">EXAMPLE</FinanceBadge>
				<span className="text-[12.5px] text-text-2">“Cut dining by $150/mo” → Emergency fund <b className="text-pos">2 months sooner</b></span>
			</div>
			<button
				type="button"
				disabled
				className="mt-3.5 inline-flex cursor-not-allowed items-center gap-1.5 rounded-[var(--radius-md)] border border-border-strong bg-card px-3.5 py-2 text-[12.5px] font-semibold text-text-3"
			>
				🔔 Notify me when it ships
			</button>
		</div>
	);
};

WhatIfCard.displayName = 'WhatIfCard';

export { WhatIfCard };
