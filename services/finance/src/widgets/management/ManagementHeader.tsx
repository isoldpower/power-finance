import type { FC } from "react";
import { FinanceButton } from "@internal/ui-library";

import type { PanelMode } from "./mock.ts";

interface ManagementHeaderProps {
	onOpenPanel: (mode: PanelMode) => void;
}

const ManagementHeader: FC<ManagementHeaderProps> = ({ onOpenPanel }) => {
	return (
		<div className="flex flex-wrap items-center gap-3.5">
			<h1 className="font-display text-2xl font-semibold tracking-[-0.01em]">Management</h1>
			<span className="hidden font-numeric text-[11px] uppercase tracking-[0.08em] text-text-3 sm:block">
				Wallets · Transactions · Ledger
			</span>
			<div className="flex-1" />
			<FinanceButton variant="secondary" className="hidden items-center gap-2 sm:flex" onClick={() => { onOpenPanel('scan'); }}>
				<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
					<path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
					<circle cx="12" cy="13" r="4" />
				</svg>
				Scan receipt
				<span className="rounded-[4px] bg-primary px-1.5 font-numeric text-[9px] font-bold text-white">AI</span>
			</FinanceButton>
			<FinanceButton className="shadow-[0_4px_14px_var(--glow)]" onClick={() => { onOpenPanel('add'); }}>
				＋ Add
			</FinanceButton>
		</div>
	);
};

ManagementHeader.displayName = 'ManagementHeader';

export { ManagementHeader };
export type { ManagementHeaderProps };
