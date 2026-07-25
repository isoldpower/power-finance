import type { FC } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { WalletFormFields } from "./WalletFormFields.tsx";
import { PanelFooter } from "@shared/components";
import { EditWalletForm as EditWalletFormWrapper, walletEntrySchema } from "@feature/wallets/wallet-actions";
import type { WalletEntrySchema } from "@feature/wallets/wallet-actions";
import { MOCK_WALLET_TYPES } from "@feature/wallets";
import { MOCK_CURRENCIES } from "@feature/localization";
import type { PanelWallet } from "@feature/wallets";

const CREDIT_TYPE = 'Credit card';

interface EditWalletFormProps {
	wallet: PanelWallet;
	onClose: () => void;
}

const EditWalletForm: FC<EditWalletFormProps> = ({ wallet, onClose }) => {
	const form = useForm<WalletEntrySchema>({
		resolver: zodResolver(walletEntrySchema),
		defaultValues: {
			name: wallet.name,
			type: wallet.credit ? CREDIT_TYPE : MOCK_WALLET_TYPES[0],
			currency: wallet.currency,
			balance: '',
		},
	});
	const values = form.watch();

	return (
		<EditWalletFormWrapper wallet={wallet} handleSubmit={form.handleSubmit} onSuccess={onClose}>
			<WalletFormFields
				name={values.name} setName={(value) => { form.setValue('name', value); }}
				type={values.type} setType={(value) => { form.setValue('type', value); }}
				currency={values.currency} setCurrency={(value) => { form.setValue('currency', value); }}
				balance="" setBalance={() => undefined}
				gradient={wallet.gradient}
				editing
				walletTypes={MOCK_WALLET_TYPES}
				currencies={MOCK_CURRENCIES}
			/>
			<PanelFooter submitType="submit" submitLabel="Save changes" onClose={onClose} />
		</EditWalletFormWrapper>
	);
};

EditWalletForm.displayName = 'EditWalletForm';

export { EditWalletForm };
export type { EditWalletFormProps };
