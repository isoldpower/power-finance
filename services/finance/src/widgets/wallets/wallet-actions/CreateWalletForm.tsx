import type { FC } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { NEW_WALLET_GRADIENT } from "@entity/wallets";
import { WalletFormFields } from "./WalletFormFields.tsx";
import { PanelFooter } from "@shared/components";
import { CreateWalletForm as CreateWalletFormWrapper, walletEntrySchema } from "@feature/wallets/wallet-actions";
import type { WalletEntrySchema } from "@feature/wallets/wallet-actions";
import { MOCK_WALLET_TYPES } from "@feature/wallets";
import { useCurrencies } from "@feature/localization";
import { useSettingsContext } from "@internal/shared";

interface CreateWalletFormProps {
	onClose: () => void;
}

const CreateWalletForm: FC<CreateWalletFormProps> = ({ onClose }) => {
	const { mainCurrency } = useSettingsContext();
	const { currencies } = useCurrencies();
	const form = useForm<WalletEntrySchema>({
		resolver: zodResolver(walletEntrySchema),
		defaultValues: { name: '', type: MOCK_WALLET_TYPES[0], currency: mainCurrency, balance: '' },
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
				currencies={currencies}
			/>
			<PanelFooter submitType="submit" submitLabel="Create wallet" onClose={onClose} />
		</CreateWalletFormWrapper>
	);
};

CreateWalletForm.displayName = 'CreateWalletForm';

export { CreateWalletForm };
export type { CreateWalletFormProps };
