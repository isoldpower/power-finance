import type { FC } from "react";
import { cn, FinanceButton } from "@internal/ui-library";

import type { PanelMode } from "@feature/wallets";
import { ScanReceiptIcon } from "@entity/transactions";
import { AiBadge } from "@shared/components";

interface ManagementHeaderProps {
	onOpenPanel: (mode: PanelMode) => void;
	className?: string;
}

const ManagementHeader: FC<ManagementHeaderProps> = ({ onOpenPanel, className }) => {
	return (
		<div className={cn("flex flex-wrap items-center gap-3.5", className)}>
			<h1 className="font-display text-2xl font-semibold tracking-[-0.01em]">Management</h1>
			<span className="hidden font-numeric text-[11px] uppercase tracking-[0.08em] text-text-3 sm:block">
				Wallets · Transactions · Ledger
			</span>
			<div className="flex-1" />
			<FinanceButton variant="secondary" className="hidden items-center gap-2 sm:flex" onClick={() => { onOpenPanel('scan'); }}>
				<ScanReceiptIcon />
				Scan receipt
				<AiBadge />
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
