import type { FC } from "react";
import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { getFinanceRoute } from "@internal/shared";
import {
	cn,
	FinanceCard,
	FinanceSegmented,
	FinanceSegmentedItem,
	FinanceChip,
	FinanceButton,
} from "@internal/ui-library";

type QuickAddType = 'expense' | 'income' | 'transfer';

const TYPE_OPTIONS: { key: QuickAddType; label: string }[] = [
	{ key: 'expense', label: 'Expense' },
	{ key: 'income', label: 'Income' },
	{ key: 'transfer', label: 'Transfer' },
];

// TODO wire to backend
const MOCK_CATEGORIES = ['Dining', 'Groceries', 'Transport', 'Bills', 'Shopping'];

const QuickAddPanel: FC = () => {
	const [type, setType] = useState<QuickAddType>('expense');
	const [amount, setAmount] = useState('');
	const [category, setCategory] = useState<string | null>(null);

	const isIncome = type === 'income';
	const signColor = isIncome ? 'text-pos' : 'text-neg';

	return (
		<FinanceCard className="p-4">
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
				<span className={cn("font-display text-2xl", signColor)}>{isIncome ? '+' : '−'}</span>
				<span className={cn("font-display text-3xl font-semibold", signColor)}>$</span>
				<input
					value={amount}
					onChange={(event) => { setAmount(event.target.value); }}
					inputMode="decimal"
					placeholder="0.00"
					className={cn("w-full min-w-0 flex-1 border-none bg-transparent p-0 font-display text-3xl font-semibold outline-none placeholder:text-text-3", signColor)}
				/>
			</div>

			<div className="mb-3.5 flex flex-wrap gap-1.5">
				{MOCK_CATEGORIES.map((option) => (
					<FinanceChip
						key={option}
						pressed={category === option}
						onPressedChange={(pressed) => { setCategory(pressed ? option : null); }}
					>
						{option}
					</FinanceChip>
				))}
			</div>

			<FinanceButton size="lg" className="w-full">
				Add {isIncome ? 'income' : type === 'transfer' ? 'transfer' : 'expense'}
			</FinanceButton>

			<Link to={getFinanceRoute('management')} className="mt-2.5 block text-center text-xs text-text-3">
				Need to scan a receipt or edit? <span className="font-semibold text-primary">Open Management →</span>
			</Link>
		</FinanceCard>
	);
};

QuickAddPanel.displayName = 'QuickAddPanel';

export { QuickAddPanel };
