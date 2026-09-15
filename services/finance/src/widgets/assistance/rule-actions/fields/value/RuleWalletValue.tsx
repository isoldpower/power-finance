import { useMemo } from "react";
import { useWalletsList } from "@feature/wallets";

import { RuleOptionValue } from "./RuleOptionValue.tsx";

import type { FC } from "react";
import type { SelectOption } from "@shared/forms";


interface RuleWalletValueProps {
	value: string;
	multiple: boolean;
	disabled?: boolean;
	onChange: (value: string) => void;
}

const RuleWalletValue: FC<RuleWalletValueProps> = ({ value, multiple, disabled, onChange }) => {
	const { wallets } = useWalletsList();
	const options = useMemo<SelectOption[]>(
		() => wallets.map((wallet) => ({ value: wallet.id, label: wallet.name })),
		[wallets]
	);

	return (
		<RuleOptionValue
			value={value}
			options={options}
			multiple={multiple}
			searchable
			placeholder="Pick a wallet"
			searchPlaceholder="Search wallets…"
			emptyLabel="No wallets match."
			disabled={disabled}
			onChange={onChange}
		/>
	);
};

RuleWalletValue.displayName = 'RuleWalletValue';

export { RuleWalletValue };
export type { RuleWalletValueProps };
