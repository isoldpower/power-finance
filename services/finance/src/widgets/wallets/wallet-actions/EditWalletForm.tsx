import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FinanceInput, UiForm, UiFormField } from "@internal/ui-library";
import { CurrencyCombobox } from "@widget/localization";
import { BalanceLockedNotice, WalletPreviewCard, WalletTypeSelector } from "@entity/wallets";
import {
	WalletFormOnSubmit,
	useWalletFormInitials,
	useWalletFormState,
	walletFormSchema,
	MOCK_WALLET_TYPES,
} from "@feature/wallets";
import { FieldLabel, PanelFooter } from "@shared/components";

import type { FC } from "react";
import type { PanelWallet, WalletFormSchema } from "@feature/wallets";
import type { CurrencyMeta } from "@entity/localization";


interface EditWalletFormProps {
	wallet: PanelWallet;
	currencies: CurrencyMeta[];
	onClose: () => void;
}

const EditWalletForm: FC<EditWalletFormProps> = ({ wallet, currencies, onClose }) => {
	const defaultValues = useWalletFormInitials(wallet);
	const form = useForm<WalletFormSchema>({
		defaultValues,
		mode: 'onChange',
		resolver: zodResolver(walletFormSchema),
	});
	
	const { loading, canSubmit, methods } = useWalletFormState(form);
	const { name, type, currency } = useWatch({ control: form.control });
	
	return (
		<UiForm {...form}>
			<WalletFormOnSubmit
				className="flex flex-1 flex-col overflow-hidden"
				wallet={wallet}
				handleSubmit={form.handleSubmit}
				onBeforeEdit={methods.handleLoading}
				onSuccess={() => { methods.handleDoneLoading(); onClose(); }}
				onError={methods.handleFailedLoading}
			>
				<div className="flex-1 overflow-auto p-5">
					<WalletPreviewCard 
						gradient={wallet.gradient}
						type={type ?? ''}
						currency={currency ?? ''}
						name={name ?? ''}
					/>
					<FieldLabel>Wallet name</FieldLabel>
					<UiFormField
						disabled={loading}
						control={form.control}
						name="name"
						render={({ field }) => (
							<FinanceInput placeholder="e.g. Travel Card" className="mb-4" {...field} />
						)} />
					<FieldLabel>Type</FieldLabel>
					<UiFormField
						disabled={loading}
						control={form.control}
						name="type"
						render={({ field }) => (
							<WalletTypeSelector options={MOCK_WALLET_TYPES} className="mb-4" {...field} />
						)} />
					<FieldLabel>Currency</FieldLabel>
					<UiFormField
						disabled={loading}
						control={form.control}
						name="currency"
						render={({ field }) => (
							<CurrencyCombobox
								currencies={currencies}
								value={field.value}
								onSelected={field.onChange}
								className="mb-4"
							/>
						)} />
					<BalanceLockedNotice />
				</div>
				<PanelFooter
					submitType="submit"
					submitLabel={loading ? 'Saving…' : 'Save changes'}
					onClose={onClose}
					submitDisabled={!canSubmit}
				/>
			</WalletFormOnSubmit>
		</UiForm>
	);
};

EditWalletForm.displayName = 'EditWalletForm';

export { EditWalletForm };
export type { EditWalletFormProps };
