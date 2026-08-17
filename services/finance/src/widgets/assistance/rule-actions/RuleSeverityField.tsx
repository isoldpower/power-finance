import { SEVERITY_OPTIONS } from "./config.ts";
import { RuleChoiceField } from "./RuleChoiceField.tsx";

import type { FC } from "react";
import type { Control } from "react-hook-form";
import type { RuleFormSchema } from "@feature/assistance";


interface RuleSeverityFieldProps {
	control: Control<RuleFormSchema>;
	error?: string;
	disabled?: boolean;
}

const RuleSeverityField: FC<RuleSeverityFieldProps> = ({ control, error, disabled }) => (
	<RuleChoiceField
		control={control}
		name="severity"
		label="How urgent is it?"
		options={SEVERITY_OPTIONS}
		ariaLabel="Severity"
		placeholder="Select severity"
		error={error}
		disabled={disabled}
	/>
);

RuleSeverityField.displayName = 'RuleSeverityField';

export { RuleSeverityField };
export type { RuleSeverityFieldProps };
