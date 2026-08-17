import { TRIGGER_SCHEDULE_OPTIONS } from "./config.ts";
import { RuleChoiceField } from "./RuleChoiceField.tsx";

import type { FC } from "react";
import type { Control } from "react-hook-form";
import type { RuleFormSchema } from "@feature/assistance";


interface RuleScheduleFieldProps {
	control: Control<RuleFormSchema>;
	error?: string;
	disabled?: boolean;
}

const RuleScheduleField: FC<RuleScheduleFieldProps> = ({ control, error, disabled }) => (
	<RuleChoiceField
		control={control}
		name="schedule"
		label="How often should it run?"
		options={TRIGGER_SCHEDULE_OPTIONS}
		ariaLabel="Trigger schedule"
		placeholder="Select schedule"
		error={error}
		disabled={disabled}
	/>
);

RuleScheduleField.displayName = 'RuleScheduleField';

export { RuleScheduleField };
export type { RuleScheduleFieldProps };
