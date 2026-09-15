import { RuleCategoryValue } from "./value/RuleCategoryValue.tsx";
import { RuleCurrencyValue } from "./value/RuleCurrencyValue.tsx";
import { RuleOptionValue } from "./value/RuleOptionValue.tsx";
import { RuleTextValue } from "./value/RuleTextValue.tsx";
import { RuleWalletValue } from "./value/RuleWalletValue.tsx";
import { TRANSACTION_ORIGIN_OPTIONS, TRANSACTION_TYPE_OPTIONS } from "./value/config.ts";

import type { FC } from "react";
import type { FilterPolicyInput } from "@feature/assistance";


interface RuleConditionValueFieldProps {
	input: FilterPolicyInput;
	value: string;
	disabled?: boolean;
	onChange: (value: string) => void;
}

const RuleConditionValueField: FC<RuleConditionValueFieldProps> = ({
	input,
	value,
	disabled,
	onChange,
}) => {
	const shared = { value, multiple: input.multiple, disabled, onChange };

	switch (input.kind) {
		case 'currency':
			return <RuleCurrencyValue {...shared} />;
		case 'category':
			return <RuleCategoryValue {...shared} />;
		case 'wallet':
			return <RuleWalletValue {...shared} />;
		case 'transactionType':
			return (
				<RuleOptionValue
					{...shared}
					options={TRANSACTION_TYPE_OPTIONS}
					searchable={false}
					placeholder="Pick a type"
					searchPlaceholder="Search types…"
					emptyLabel="No types match."
				/>
			);
		case 'transactionOrigin':
			return (
				<RuleOptionValue
					{...shared}
					options={TRANSACTION_ORIGIN_OPTIONS}
					searchable={false}
					placeholder="Pick an origin"
					searchPlaceholder="Search origins…"
					emptyLabel="No origins match."
				/>
			);
		default:
			return <RuleTextValue {...shared} kind={input.kind} />;
	}
};

RuleConditionValueField.displayName = 'RuleConditionValueField';

export { RuleConditionValueField };
export type { RuleConditionValueFieldProps };
