import { ScanReceiptIcon } from "@shared/pure-components/icons";
import type { FC } from "react";
import { cn, FinanceButton } from "@internal/ui-library";

import type { PanelMode } from "@entity/wallets";
import { AiBadge } from "@shared/pure-components/badges";
import { Overline, PageTitle } from "@shared/pure-components/typography";

interface ManagementHeaderProps {
	onOpenPanel: (mode: PanelMode) => void;
	className?: string;
}

const ManagementHeader: FC<ManagementHeaderProps> = ({ onOpenPanel, className }) => {
	return (
		<div className={cn("flex flex-wrap items-center gap-3.5", className)}>
			<PageTitle>Management</PageTitle>
			<Overline as="span" size="11" tracking="0.08em" className="hidden sm:block">
				Wallets · Transactions · Ledger
			</Overline>
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
