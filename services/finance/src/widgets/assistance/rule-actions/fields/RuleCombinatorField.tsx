import { Controller } from "react-hook-form";

import { RuleSelectField } from "./RuleSelectField.tsx";

import type { FC } from "react";
import type { Control } from "react-hook-form";
import type { RuleFormSchema } from "@feature/assistance";
import type { SelectOption } from "@shared/forms";


interface RuleCombinatorFieldProps {
	control: Control<RuleFormSchema>;
	options: SelectOption[];
	disabled?: boolean;
}

const RuleCombinatorField: FC<RuleCombinatorFieldProps> = ({ control, options, disabled }) => (
	<Controller
		control={control}
		name="combinator"
		render={({ field }) => (
			<RuleSelectField
				value={field.value}
				options={options}
				ariaLabel="Combine conditions"
				className="w-full"
				disabled={disabled}
				onChange={field.onChange}
			/>
		)}
	/>
);

RuleCombinatorField.displayName = 'RuleCombinatorField';

export { RuleCombinatorField };
export type { RuleCombinatorFieldProps };
