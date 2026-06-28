import type { FC } from "react";
import { Link } from "@tanstack/react-router";
import { getFinanceRoute } from "@internal/shared";
import {
	cn,
	FinanceCard,
	FinanceSegmented,
	FinanceSegmentedItem,
	FinanceButton,
} from "@internal/ui-library";

import { useQuickAdd } from "@feature/transaction";
import type { QuickAddType } from "@feature/transaction";
import { currencySymbol, sanitizeAmountInput, TRANSACTION_TYPE_TONE as SIGN_COLOR, TRANSACTION_TYPE_OPTIONS as TYPE_OPTIONS } from "@shared/utils";
import { WalletSelect } from "@entity/wallet";
import { TransferGlyph, FromIcon, ToIcon } from "@entity/transaction";

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

	const signColor = SIGN_COLOR[type];

	return (
		<FinanceCard className={cn("p-4", className)}>
			<div className="mb-3 flex items-center gap-2">
				<span className="flex-1 text-sm font-semibold">Quick add</span>
				<span className="font-numeric text-[10px] text-text-3">SIMPLE</span>
			</div>

			<FinanceSegmented value={type} onValueChange={(value) => { if (value) setType(value as QuickAddType); }} className="mb-3.5 w-full">
				{TYPE_OPTIONS.map((option) => (
					<FinanceSegmentedItem key={option.key} value={option.key} accent className="flex-1">
						{option.label}
					</FinanceSegmentedItem>
				))}
			</FinanceSegmented>

			<div className="mb-2.5 flex items-center gap-2 rounded-[var(--radius-md)] border border-border-strong px-3.5 py-2.5">
				{isTransfer ? (
					<TransferGlyph className={signColor} />
				) : (
					<span className={cn("font-display text-2xl", signColor)}>{type === 'income' ? '+' : '−'}</span>
				)}
				<span className={cn("font-display text-3xl font-semibold", signColor)}>{currencySymbol(currency)}</span>
				<input
					value={amount}
					onChange={(event) => { setAmount(sanitizeAmountInput(event.target.value)); }}
					inputMode="decimal"
					placeholder="0.00"
					className={cn("w-full min-w-0 flex-1 border-none bg-transparent p-0 font-display text-3xl font-semibold outline-none placeholder:text-[var(--text-3)]", signColor)}
				/>
			</div>

			{isTransfer ? (
				<WalletSelect
					showSwatch={false}
					leadingIcon={<FromIcon className="flex-none text-text-3" />}
					options={walletOptions}
					value={walletId}
					onChange={setWalletId}
					emptyLabel="No wallets yet"
				/>
			) : (
				<WalletSelect options={walletOptions} value={walletId} onChange={setWalletId} emptyLabel="No wallets yet" />
			)}

			{isTransfer ? (
				<WalletSelect
					showSwatch={false}
					leadingIcon={<ToIcon className="flex-none text-text-3" />}
					options={walletOptions.filter((option) => option.id !== walletId)}
					value={toWalletId}
					onChange={setToWalletId}
					emptyLabel="Add another wallet"
					className="mt-2"
				/>
			) : null}

			<FinanceButton size="lg" className="mt-3.5 w-full" disabled={!canSubmit} onClick={onAdd}>
				{isPending ? 'Adding…' : `Add ${type}`}
			</FinanceButton>

			<Link to={getFinanceRoute('management')} className="mt-2.5 block text-center text-xs text-text-3">
				Need to scan a receipt or edit? <span className="font-semibold text-primary">Open Management →</span>
			</Link>
		</FinanceCard>
	);
};

QuickAddPanel.displayName = 'QuickAddPanel';

export { QuickAddPanel };
