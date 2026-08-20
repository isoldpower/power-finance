import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FinanceInput, UiForm, UiFormField } from "@internal/ui-library";
import { WalletLockedField, WalletPreviewCard } from "@entity/wallets";
import { WalletFormOnSubmit, useWalletFormInitials, useWalletFormState, walletFormSchema } from "@feature/wallets";
import { FieldLabel, PanelFooter } from "@shared/forms";
import { useLocaleCurrency } from "@shared/formatting";

import type { FC } from "react";
import type { WalletFormSchema } from "@feature/wallets";
import type { PanelWallet } from "@entity/wallets";


interface EditWalletFormProps {
	wallet: PanelWallet;
	onClose: () => void;
}

const EditWalletForm: FC<EditWalletFormProps> = ({ wallet, onClose }) => {
	const defaultValues = useWalletFormInitials(wallet);
	const form = useForm<WalletFormSchema>({
		defaultValues,
		mode: 'onChange',
		resolver: zodResolver(walletFormSchema),
	});
	
	const { loading, canSubmit, methods } = useWalletFormState(form);
	const format = useLocaleCurrency();
	const { name, category } = useWatch({ control: form.control });
	
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
					<WalletPreviewCard gradient={wallet.gradient}>
						<WalletPreviewCard.Header>
							<WalletPreviewCard.Type>
								{category ?? ''}
							</WalletPreviewCard.Type>
							<WalletPreviewCard.Currency>
								{wallet.currency}
							</WalletPreviewCard.Currency>
						</WalletPreviewCard.Header>
						<WalletPreviewCard.Name>
							{(name ?? '') || 'Wallet name'}
						</WalletPreviewCard.Name>
					</WalletPreviewCard>
					<FieldLabel>Wallet name</FieldLabel>
					<UiFormField
						disabled={loading}
						control={form.control}
						name="name"
						render={({ field }) => (
							<FinanceInput placeholder="e.g. Travel Card" className="mb-4" {...field} />
						)} />
					<FieldLabel>Category</FieldLabel>
					<UiFormField
						disabled={loading}
						control={form.control}
						name="category"
						render={({ field }) => (
							<FinanceInput placeholder="e.g. Savings" className="mb-4" {...field} />
						)} />
					<div className="mb-4">
						<FieldLabel>Currency</FieldLabel>
						<WalletLockedField>
							<WalletLockedField.Icon />
							<WalletLockedField.Body>
								<WalletLockedField.Code>
									{wallet.currency}
								</WalletLockedField.Code>
								<WalletLockedField.Hint>
									Fixed at creation
								</WalletLockedField.Hint>
							</WalletLockedField.Body>
						</WalletLockedField>
					</div>
					<FieldLabel>Balance</FieldLabel>
					<WalletLockedField>
						<WalletLockedField.Icon />
						<WalletLockedField.Body>
							<WalletLockedField.Value tone={wallet.balance.amount < 0 ? 'neg' : 'neutral'}>
								{format(wallet.balance.amount, wallet.balance.currency)}
							</WalletLockedField.Value>
							<WalletLockedField.Hint>
								Posted automatically from transactions
							</WalletLockedField.Hint>
						</WalletLockedField.Body>
					</WalletLockedField>
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
