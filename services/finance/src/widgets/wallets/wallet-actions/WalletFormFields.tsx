import type { FC } from "react";
import { FinanceInput, FinanceSegmented, FinanceSegmentedItem } from "@internal/ui-library";

import { WalletPreviewCard, BalanceLockedNotice } from "@entity/wallets";
import { CurrencyCombobox } from "@widget/localization";
import { FieldLabel } from "@shared/components";
import type { CurrencyMeta } from "@entity/localization";

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
	currencies: CurrencyMeta[];
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
		<WalletPreviewCard gradient={gradient} type={type} currency={currency} name={name} />

		<FieldLabel>Wallet name</FieldLabel>
		<FinanceInput value={name} onChange={(event) => { setName(event.target.value); }} placeholder="e.g. Travel Card" className="mb-4" />

		<FieldLabel>Type</FieldLabel>
		<FinanceSegmented value={type} onValueChange={(value) => { if (value) setType(value); }} className="mb-4 w-full">
			{walletTypes.map((option) => (
				<FinanceSegmentedItem key={option} value={option} className="flex-1 text-[11px]">{option}</FinanceSegmentedItem>
			))}
		</FinanceSegmented>

		<FieldLabel>Currency</FieldLabel>
		<CurrencyCombobox
			currencies={currencies}
			value={currency}
			onSelected={setCurrency}
			className="mb-4"
		/>

		{editing ? (
			<BalanceLockedNotice />
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
