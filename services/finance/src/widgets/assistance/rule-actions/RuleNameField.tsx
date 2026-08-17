import { Controller } from "react-hook-form";
import { cn, FinanceInput } from "@internal/ui-library";

import { RULE_FIELD_TEXT } from "./config.ts";
import { RuleField } from "./RuleField.tsx";
import { RuleIconSelect } from "./RuleIconSelect.tsx";

import type { FC } from "react";
import type { Control } from "react-hook-form";
import type { RuleFormSchema } from "@feature/assistance";


interface RuleNameFieldProps {
	control: Control<RuleFormSchema>;
	error?: string;
	disabled?: boolean;
}

const RuleNameField: FC<RuleNameFieldProps> = ({ control, error, disabled }) => (
	<RuleField label="Rule name and icon" htmlFor="rule-name" error={error}>
		<div className="flex items-center gap-2">
			<Controller
				control={control}
				name="name"
				render={({ field }) => (
					<FinanceInput
						id="rule-name"
						placeholder="Auto-categorise coffee shops"
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
						disabled={disabled}
						onChange={field.onChange}
					/>
				)}
			/>
		</div>
	</RuleField>
);

RuleNameField.displayName = 'RuleNameField';

export { RuleNameField };
export type { RuleNameFieldProps };
