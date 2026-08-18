import { Controller } from "react-hook-form";
import { cn, FinanceInput } from "@internal/ui-library";
import { RULE_FIELD_TEXT } from "./fields/config.ts";
import { RuleField } from "./fields/RuleField.tsx";

import type { FC } from "react";
import type { Control } from "react-hook-form";
import type { RuleFormSchema } from "@feature/assistance";


type RuleTextName = 'category' | 'title' | 'body' | 'fromWalletId' | 'toWalletId' | 'amount' | 'currency';

interface RuleTextControlProps {
	control: Control<RuleFormSchema>;
	name: RuleTextName;
	label: string;
	placeholder: string;
	className?: string;
	error?: string;
	disabled?: boolean;
}

const RuleTextControl: FC<RuleTextControlProps> = ({
	control,
	name,
	label,
	placeholder,
	className,
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
					className={cn(RULE_FIELD_TEXT, className)}
					disabled={disabled}
					{...field}
				/>
			)}
		/>
	</RuleField>
);

RuleTextControl.displayName = 'RuleTextControl';

export { RuleTextControl };
export type { RuleTextControlProps, RuleTextName };
