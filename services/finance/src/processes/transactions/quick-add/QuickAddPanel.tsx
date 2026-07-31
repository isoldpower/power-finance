import { cn, FinanceCard } from "@internal/ui-library";

import { QuickAddTitle, QuickAddDescriptor, QuickAddLink } from "@entity/transactions";
import { useWalletsList } from "@feature/wallets";
import { QuickAddForm } from "@widget/transactions";

import type { FC } from "react";


interface QuickAddPanelProps {
	className?: string;
}

const QuickAddPanel: FC<QuickAddPanelProps> = ({ className }) => {
	const { wallets } = useWalletsList({ 
		refetchOnMount: false,
		refetchOnReconnect: false,
		refetchOnWindowFocus: false,
	});
	
	return (
		<FinanceCard className={cn("p-4", className)}>
			<div className="mb-3 flex items-center gap-2">
				<QuickAddTitle>
					Quick add
				</QuickAddTitle>
				<QuickAddDescriptor>
					SIMPLE
				</QuickAddDescriptor>
			</div>
			<QuickAddForm wallets={wallets} />
			<QuickAddLink to="management">
				Need to scan a receipt or edit? 
				<span className="font-semibold text-primary">
					&nbsp;Open Management →
				</span>
			</QuickAddLink>
		</FinanceCard>
	);
};

QuickAddPanel.displayName = 'QuickAddPanel';

export { QuickAddPanel };
