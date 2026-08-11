import { cn, FinanceCard } from "@internal/ui-library";

import { useWalletsList } from "@feature/wallets";
import { QuickAddForm } from "@widget/transactions";
import { QuickAddTitle, QuickAddLink } from "@entity/transactions";
import { MetaText, Text } from "@shared/pure-components/typography";

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
				<MetaText size="10">
					SIMPLE
				</MetaText>
			</div>
			<QuickAddForm wallets={wallets} />
			<QuickAddLink to="management">
				Need to scan a receipt or edit? 
				<Text weight="semibold" tone="accent">
					&nbsp;Open Management →
				</Text>
			</QuickAddLink>
		</FinanceCard>
	);
};

QuickAddPanel.displayName = 'QuickAddPanel';

export { QuickAddPanel };
