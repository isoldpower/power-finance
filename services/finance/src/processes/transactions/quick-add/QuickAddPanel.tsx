import type { FC } from "react";
import { cn, FinanceCard, FinanceButton } from "@internal/ui-library";

import { useQuickAdd } from "@feature/transactions";
import { RouteLink } from "@feature/navigation";
import { QuickAddTypeSelector, QuickAddAmountField } from "@entity/transactions";
import { QuickAddWalletFields } from "@widget/transactions";


interface QuickAddPanelProps {
	className?: string;
}

const QuickAddPanel: FC<QuickAddPanelProps> = ({ className }) => {
	const {
		type,
		setType,
		amount,
		setAmount,
		walletId,
		setWalletId,
		toWalletId,
		setToWalletId,
		isTransfer,
		currency,
		walletOptions,
		canSubmit,
		isPending,
		onAdd,
	} = useQuickAdd();

	return (
		<FinanceCard className={cn("p-4", className)}>
			<div className="mb-3 flex items-center gap-2">
				<span className="flex-1 text-sm font-semibold">Quick add</span>
				<span className="font-numeric text-[10px] text-text-3">SIMPLE</span>
			</div>
			<QuickAddTypeSelector 
				value={type} 
				onChange={setType} 
				className="mb-3.5"
			/>
			<QuickAddAmountField 
				type={type}
				currency={currency}
				value={amount}
				onChange={setAmount}
				className="mb-2.5"
			/>
			<QuickAddWalletFields
				isTransfer={isTransfer}
				walletOptions={walletOptions}
				walletId={walletId}
				toWalletId={toWalletId}
				onWalletChange={setWalletId}
				onToWalletChange={setToWalletId}
			/>
			<FinanceButton size="lg" className="mt-3.5 w-full" disabled={!canSubmit} onClick={onAdd}>
				{isPending ? 'Adding…' : `Add ${type}`}
			</FinanceButton>
			<RouteLink to="management" className="mt-2.5 block text-center text-xs text-text-3">
				Need to scan a receipt or edit? 
				<span className="font-semibold text-primary">Open Management →</span>
			</RouteLink>
		</FinanceCard>
	);
};

QuickAddPanel.displayName = 'QuickAddPanel';

export { QuickAddPanel };
