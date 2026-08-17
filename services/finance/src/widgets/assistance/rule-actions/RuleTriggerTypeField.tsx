import { Controller } from "react-hook-form";

import { RuleField } from "./RuleField.tsx";
import { RuleTriggerTypeTabs } from "./RuleTriggerTypeTabs.tsx";

import type { FC } from "react";
import type { Control } from "react-hook-form";
import type { RuleFormSchema } from "@feature/assistance";


interface RuleTriggerTypeFieldProps {
	control: Control<RuleFormSchema>;
	disabled?: boolean;
}

const RuleTriggerTypeField: FC<RuleTriggerTypeFieldProps> = ({ control, disabled }) => (
	<RuleField label="When should the rule run?">
		<Controller
			control={control}
			name="triggerType"
			render={({ field }) => (
				<RuleTriggerTypeTabs
					value={field.value}
					disabled={disabled}
					onChange={field.onChange}
				/>
			)}
		/>
	</RuleField>
);

RuleTriggerTypeField.displayName = 'RuleTriggerTypeField';

export { RuleTriggerTypeField };
export type { RuleTriggerTypeFieldProps };
