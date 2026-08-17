import { EFFECT_TYPE_OPTIONS } from "./config.ts";
import { RuleChoiceField } from "./RuleChoiceField.tsx";

import type { FC } from "react";
import type { Control } from "react-hook-form";
import type { RuleFormSchema } from "@feature/assistance";


interface RuleEffectTypeFieldProps {
	control: Control<RuleFormSchema>;
	error?: string;
	disabled?: boolean;
}

const RuleEffectTypeField: FC<RuleEffectTypeFieldProps> = ({ control, error, disabled }) => (
	<RuleChoiceField
		control={control}
		name="effectType"
		label="What should happen?"
		options={EFFECT_TYPE_OPTIONS}
		ariaLabel="Rule effect"
		placeholder="Select effect"
		error={error}
		disabled={disabled}
	/>
);

RuleEffectTypeField.displayName = 'RuleEffectTypeField';

export { RuleEffectTypeField };
export type { RuleEffectTypeFieldProps };
