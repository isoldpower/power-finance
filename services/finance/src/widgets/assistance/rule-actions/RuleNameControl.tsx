import { Controller } from "react-hook-form";
import { cn, FinanceInput } from "@internal/ui-library";
import { RULE_FIELD_TEXT } from "./fields/config.ts";
import { RuleField } from "./fields/RuleField.tsx";
import { RuleIconSelect } from "./fields/RuleIconSelect.tsx";

import type { FC } from "react";
import type { Control } from "react-hook-form";
import type { RuleFormSchema } from "@feature/assistance";
import type { SelectOption } from "@shared/forms";


interface RuleNameControlProps {
	control: Control<RuleFormSchema>;
	label: string;
	placeholder: string;
	iconOptions: SelectOption[];
	error?: string;
	disabled?: boolean;
}

const RuleNameControl: FC<RuleNameControlProps> = ({
	control,
	label,
	placeholder,
	iconOptions,
	error,
	disabled,
}) => (
	<RuleField label={label} htmlFor="rule-name" error={error}>
		<div className="flex items-center gap-2">
			<Controller
				control={control}
				name="name"
				render={({ field }) => (
					<FinanceInput
						id="rule-name"
						placeholder={placeholder}
						className={cn("flex-1", RULE_FIELD_TEXT)}
						disabled={disabled}
						{...field}
					/>
				)}
			/>
			<Controller
				control={control}
				name="icon"
				render={({ field }) => (
					<RuleIconSelect
						value={field.value}
						options={iconOptions}
						disabled={disabled}
						onChange={field.onChange}
					/>
				)}
			/>
		</div>
	</RuleField>
);

RuleNameControl.displayName = 'RuleNameControl';

export { RuleNameControl };
export type { RuleNameControlProps };
