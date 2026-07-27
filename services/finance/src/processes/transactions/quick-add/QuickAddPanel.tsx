import type { FC } from "react";
import { cn, FinanceCard } from "@internal/ui-library";

import { RouteLink } from "@feature/navigation";
import {QuickAddForm} from "@widget/transactions/quick-add/QuickAddForm.tsx";
import {useWalletsList} from "@feature/wallets";


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
				<span className="flex-1 text-sm font-semibold">Quick add</span>
				<span className="font-numeric text-[10px] text-text-3">SIMPLE</span>
			</div>
			<QuickAddForm wallets={wallets} />
			<RouteLink to="management" className="mt-2.5 block text-center text-xs text-text-3">
				Need to scan a receipt or edit? 
				<span className="font-semibold text-primary">
					Open Management →
				</span>
			</RouteLink>
		</FinanceCard>
	);
};

QuickAddPanel.displayName = 'QuickAddPanel';

export { QuickAddPanel };
