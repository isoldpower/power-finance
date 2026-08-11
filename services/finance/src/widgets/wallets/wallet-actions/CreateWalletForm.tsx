import { useMemo } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FinanceInput, UiForm, UiFormField } from "@internal/ui-library";
import { CurrencyCombobox } from "@widget/localization";
import {
	NEW_WALLET_GRADIENT,
	WalletPreviewCard,
	WalletTypeSelector,
} from "@entity/wallets";
import { WalletFormOnSubmit, useWalletFormInitials, useWalletFormState, useWalletKinds, walletFormSchema } from "@feature/wallets";
import { FieldLabel, PanelFooter } from "@shared/forms";

import type { FC } from "react";
import type { WalletFormSchema } from "@feature/wallets";
import type { CurrencyMeta } from "@entity/localization";


interface CreateWalletFormProps {
	onClose: () => void;
	currencies: CurrencyMeta[];
}

const CreateWalletForm: FC<CreateWalletFormProps> = ({ 
	onClose,
	currencies,
}) => {
	const { kinds } = useWalletKinds();
	const kindLabels = useMemo(() => kinds.map((kind) => kind.label), [kinds]);
	const defaultValues = useWalletFormInitials();
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
				handleSubmit={form.handleSubmit}
				onBeforeEdit={methods.handleLoading}
				onSuccess={() => { methods.handleDoneLoading(); onClose(); }}
				onError={methods.handleFailedLoading}
			>
				<div className="flex-1 overflow-auto p-5">
					<WalletPreviewCard 
						gradient={NEW_WALLET_GRADIENT}
						type={type ?? ''}
						currency={currency ?? ''}
						name={name ?? ''}
					/>
					<FieldLabel>
						Wallet name
					</FieldLabel>
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
							<WalletTypeSelector options={kindLabels} className="mb-4" {...field} />
						)} />
					<FieldLabel>
						Currency
					</FieldLabel>
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
					<FieldLabel>Opening balance</FieldLabel>
					<UiFormField
						disabled={loading}
						control={form.control}
						name="balance"
						render={({ field }) => (
							<FinanceInput placeholder="0.00" {...field} />
						)} />
				</div>
				<PanelFooter
					submitType="submit"
					submitLabel={loading ? 'Creating…' : 'Create wallet'}
					onClose={onClose}
					submitDisabled={!canSubmit}
				/>
			</WalletFormOnSubmit>
		</UiForm>
	);
};

CreateWalletForm.displayName = 'CreateWalletForm';

export { CreateWalletForm };
export type { CreateWalletFormProps };
