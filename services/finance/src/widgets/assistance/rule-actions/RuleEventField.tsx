import { TRIGGER_EVENT_OPTIONS } from "./config.ts";
import { RuleChoiceField } from "./RuleChoiceField.tsx";

import type { FC } from "react";
import type { Control } from "react-hook-form";
import type { RuleFormSchema } from "@feature/assistance";


interface RuleEventFieldProps {
	control: Control<RuleFormSchema>;
	error?: string;
	disabled?: boolean;
}

const RuleEventField: FC<RuleEventFieldProps> = ({ control, error, disabled }) => (
	<RuleChoiceField
		control={control}
		name="event"
		label="Which event starts the rule?"
		options={TRIGGER_EVENT_OPTIONS}
		ariaLabel="Trigger event"
		placeholder="Select event"
		error={error}
		disabled={disabled}
	/>
);

RuleEventField.displayName = 'RuleEventField';

export { RuleEventField };
export type { RuleEventFieldProps };
