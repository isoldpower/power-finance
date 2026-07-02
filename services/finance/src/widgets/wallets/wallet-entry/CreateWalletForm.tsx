import type { FC } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { NEW_WALLET_GRADIENT } from "@entity/wallets";
import { WalletFormFields } from "./WalletFormFields.tsx";
import { PanelFooter } from "@shared/components";
import { CreateWalletForm as CreateWalletFormWrapper, walletEntrySchema } from "@feature/wallets/wallet-entry";
import type { WalletEntrySchema } from "@feature/wallets/wallet-entry";
import { MOCK_WALLET_TYPES } from "@feature/wallets";
import { MOCK_CURRENCIES } from "@feature/localization";

interface CreateWalletFormProps {
	onClose: () => void;
}

const CreateWalletForm: FC<CreateWalletFormProps> = ({ onClose }) => {
	const form = useForm<WalletEntrySchema>({
		resolver: zodResolver(walletEntrySchema),
		defaultValues: { name: '', type: MOCK_WALLET_TYPES[0], currency: MOCK_CURRENCIES[0], balance: '' },
	});
	const values = form.watch();

	return (
		<CreateWalletFormWrapper handleSubmit={form.handleSubmit} onSuccess={onClose}>
			<WalletFormFields
				name={values.name} setName={(value) => { form.setValue('name', value); }}
				type={values.type} setType={(value) => { form.setValue('type', value); }}
				currency={values.currency} setCurrency={(value) => { form.setValue('currency', value); }}
				balance={values.balance} setBalance={(value) => { form.setValue('balance', value); }}
				gradient={NEW_WALLET_GRADIENT}
				editing={false}
				walletTypes={MOCK_WALLET_TYPES}
				currencies={MOCK_CURRENCIES}
			/>
			<PanelFooter submitType="submit" submitLabel="Create wallet" onClose={onClose} />
		</CreateWalletFormWrapper>
	);
};

CreateWalletForm.displayName = 'CreateWalletForm';

export { CreateWalletForm };
export type { CreateWalletFormProps };
