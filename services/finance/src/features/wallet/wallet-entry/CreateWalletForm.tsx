import type { FC } from "react";
import { useState } from "react";

import { WalletFormFields, PanelFooter } from "@entity/management";
import { MOCK_WALLET_TYPES, MOCK_CURRENCIES } from "@feature/management";

import { useWalletsListMethods } from "../data-presenters/use-wallets-list-methods.ts";

const CREDIT_TYPE = 'Credit card';

interface CreateWalletFormProps {
	onClose: () => void;
}

const CreateWalletForm: FC<CreateWalletFormProps> = ({ onClose }) => {
	const { meta } = useWalletsListMethods();
	const [name, setName] = useState('');
	const [type, setType] = useState(MOCK_WALLET_TYPES[0]);
	const [currency, setCurrency] = useState(MOCK_CURRENCIES[0]);
	const [balance, setBalance] = useState('');

	const trimmedName = name.trim();
	const canSubmit = trimmedName !== '' && !meta.createMutation.isPending;

	const onSubmit = () => {
		if (!canSubmit) return;
		meta.createMutation.mutate(
			{
				data: {
					name: trimmedName,
					balance: { amount: parseFloat(balance) || 0, currency },
					credit: type === CREDIT_TYPE,
				},
			},
			{ onSuccess: () => { onClose(); } }
		);
	};

	return (
		<>
			<WalletFormFields
				name={name} setName={setName}
				type={type} setType={setType}
				currency={currency} setCurrency={setCurrency}
				balance={balance} setBalance={setBalance}
				gradient="linear-gradient(135deg,#6366f1,#4f46e5)"
				editing={false}
				walletTypes={MOCK_WALLET_TYPES}
				currencies={MOCK_CURRENCIES}
			/>
			<PanelFooter
				submitLabel={meta.createMutation.isPending ? 'Creating…' : 'Create wallet'}
				onClose={onClose}
				onSubmit={onSubmit}
				submitDisabled={!canSubmit}
			/>
		</>
	);
};

CreateWalletForm.displayName = 'CreateWalletForm';

export { CreateWalletForm };
export type { CreateWalletFormProps };
