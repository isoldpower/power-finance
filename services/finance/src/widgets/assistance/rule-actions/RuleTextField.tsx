import { Controller } from "react-hook-form";
import { FinanceInput } from "@internal/ui-library";

import { RULE_FIELD_TEXT } from "./config.ts";
import { RuleField } from "./RuleField.tsx";

import type { FC } from "react";
import type { Control } from "react-hook-form";
import type { RuleFormSchema } from "@feature/assistance";


type RuleTextName = 'category' | 'title' | 'body' | 'fromWalletId' | 'toWalletId' | 'amount' | 'currency';

interface RuleTextFieldProps {
	control: Control<RuleFormSchema>;
	name: RuleTextName;
	label: string;
	placeholder: string;
	error?: string;
	disabled?: boolean;
}

const RuleTextField: FC<RuleTextFieldProps> = ({
	control,
	name,
	label,
	placeholder,
	error,
	disabled,
}) => (
	<RuleField label={label} htmlFor={`rule-${name}`} error={error}>
		<Controller
			control={control}
			name={name}
			render={({ field }) => (
				<FinanceInput
					id={`rule-${name}`}
					placeholder={placeholder}
					className={RULE_FIELD_TEXT}
					disabled={disabled}
					{...field}
				/>
			)}
		/>
	</RuleField>
);

RuleTextField.displayName = 'RuleTextField';

export { RuleTextField };
export type { RuleTextFieldProps, RuleTextName };
