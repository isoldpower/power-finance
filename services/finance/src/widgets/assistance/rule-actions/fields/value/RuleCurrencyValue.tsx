import { useMemo } from "react";
import { useCurrencies } from "@feature/localization";

import { RuleOptionValue } from "./RuleOptionValue.tsx";

import type { FC } from "react";
import type { SelectOption } from "@shared/forms";


interface RuleCurrencyValueProps {
	value: string;
	multiple: boolean;
	disabled?: boolean;
	onChange: (value: string) => void;
}

const RuleCurrencyValue: FC<RuleCurrencyValueProps> = ({ value, multiple, disabled, onChange }) => {
	const { currencies } = useCurrencies();
	const options = useMemo<SelectOption[]>(
		() => currencies.map((currency) => ({
			value: currency.code,
			label: `${currency.code} · ${currency.name}`,
		})),
		[currencies]
	);

	return (
		<RuleOptionValue
			value={value}
			options={options}
			multiple={multiple}
			searchable
			placeholder="Pick a currency"
			searchPlaceholder="Search currencies…"
			emptyLabel="No currencies match."
			disabled={disabled}
			onChange={onChange}
		/>
	);
};

RuleCurrencyValue.displayName = 'RuleCurrencyValue';

export { RuleCurrencyValue };
export type { RuleCurrencyValueProps };
