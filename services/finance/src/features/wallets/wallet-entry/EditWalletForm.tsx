import type { FC } from "react";
import { useState } from "react";

import { WalletFormFields, PanelFooter } from "@entity/management";
import { MOCK_WALLET_TYPES, MOCK_CURRENCIES } from "@feature/management";
import type { PanelWallet } from "@feature/management";

import { useWalletMethods } from "@feature/wallets/data-presenters/use-wallet-methods.ts";

const CREDIT_TYPE = 'Credit card';

interface EditWalletFormProps {
	wallet: PanelWallet;
	onClose: () => void;
}

const EditWalletForm: FC<EditWalletFormProps> = ({ wallet, onClose }) => {
	const { updateWallet, meta } = useWalletMethods(wallet.id);
	const [name, setName] = useState(wallet.name);
	const [type, setType] = useState(wallet.credit ? CREDIT_TYPE : MOCK_WALLET_TYPES[0]);
	const [currency, setCurrency] = useState(wallet.currency);

	const trimmedName = name.trim();
	const canSubmit = trimmedName !== '' && !meta.updateMutation.isPending;

	const onSubmit = () => {
		if (!canSubmit) return;
		updateWallet({
			name: trimmedName,
			balance: { amount: wallet.balance.amount, currency },
			credit: type === CREDIT_TYPE,
		})
			.then(() => { onClose(); })
			.catch((error: unknown) => { console.error(error); });
	};

	return (
		<>
			<WalletFormFields
				name={name} setName={setName}
				type={type} setType={setType}
				currency={currency} setCurrency={setCurrency}
				balance="" setBalance={() => undefined}
				gradient={wallet.gradient}
				editing
				walletTypes={MOCK_WALLET_TYPES}
				currencies={MOCK_CURRENCIES}
			/>
			<PanelFooter
				submitLabel={meta.updateMutation.isPending ? 'Saving…' : 'Save changes'}
				onClose={onClose}
				onSubmit={onSubmit}
				submitDisabled={!canSubmit}
			/>
		</>
	);
};

EditWalletForm.displayName = 'EditWalletForm';

export { EditWalletForm };
export type { EditWalletFormProps };
