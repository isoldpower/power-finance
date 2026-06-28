import type { FC } from "react";
import { FinanceInput, FinanceSegmented, FinanceSegmentedItem } from "@internal/ui-library";

import { FieldLabel } from "@shared/components";

interface WalletFormFieldsProps {
	name: string;
	setName: (value: string) => void;
	type: string;
	setType: (value: string) => void;
	currency: string;
	setCurrency: (value: string) => void;
	balance: string;
	setBalance: (value: string) => void;
	gradient: string;
	editing: boolean;
	walletTypes: string[];
	currencies: string[];
}

const WalletFormFields: FC<WalletFormFieldsProps> = ({
	name,
	setName,
	type,
	setType,
	currency,
	setCurrency,
	balance,
	setBalance,
	gradient,
	editing,
	walletTypes,
	currencies,
}) => (
	<div className="flex-1 overflow-auto p-5">
		<div
			className="mb-5 flex h-[120px] flex-col justify-between rounded-[12px] p-4 shadow-[var(--shadow-lg)]"
			style={{ background: gradient }}
		>
			<div className="flex items-center justify-between text-white/90">
				<span className="text-xs font-semibold tracking-[0.04em]">{type}</span>
				<span className="font-numeric text-[11px] opacity-85">{currency}</span>
			</div>
			<div className="font-display text-[19px] font-semibold tracking-[-0.01em] text-white">{name || 'Wallet name'}</div>
		</div>

		<FieldLabel>Wallet name</FieldLabel>
		<FinanceInput value={name} onChange={(event) => { setName(event.target.value); }} placeholder="e.g. Travel Card" className="mb-4" />

		<FieldLabel>Type</FieldLabel>
		<FinanceSegmented value={type} onValueChange={(value) => { if (value) setType(value); }} className="mb-4 w-full">
			{walletTypes.map((option) => (
				<FinanceSegmentedItem key={option} value={option} className="flex-1 text-[11px]">{option}</FinanceSegmentedItem>
			))}
		</FinanceSegmented>

		<FieldLabel>Currency</FieldLabel>
		<FinanceSegmented value={currency} onValueChange={(value) => { if (value) setCurrency(value); }} className="mb-4 w-full">
			{currencies.map((option) => (
				<FinanceSegmentedItem key={option} value={option} className="flex-1">{option}</FinanceSegmentedItem>
			))}
		</FinanceSegmented>

		{editing ? (
			<div className="flex items-start gap-2.5 rounded-[var(--radius-md)] border border-border bg-secondary px-3 py-2.5">
				<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--text-3)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 flex-none">
					<rect x="3" y="11" width="18" height="11" rx="2" />
					<path d="M7 11V7a5 5 0 0 1 10 0v4" />
				</svg>
				<span className="text-[11.5px] leading-snug text-text-2">Balance is posted automatically from transactions and can’t be edited here.</span>
			</div>
		) : (
			<>
				<FieldLabel>Opening balance</FieldLabel>
				<FinanceInput value={balance} onChange={(event) => { setBalance(event.target.value); }} placeholder="0.00" />
			</>
		)}
	</div>
);

WalletFormFields.displayName = 'WalletFormFields';

export { WalletFormFields };
export type { WalletFormFieldsProps };
