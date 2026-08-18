import { Controller } from "react-hook-form";
import { RuleField } from "./fields/RuleField.tsx";
import { RuleTriggerTypeTabs } from "./fields/RuleTriggerTypeTabs.tsx";

import type { FC } from "react";
import type { Control } from "react-hook-form";
import type { RuleFormSchema } from "@feature/assistance";
import type { SelectOption } from "@shared/forms";


interface RuleTriggerTypeControlProps {
	control: Control<RuleFormSchema>;
	label: string;
	options: SelectOption[];
	disabled?: boolean;
}

const RuleTriggerTypeControl: FC<RuleTriggerTypeControlProps> = ({
	control,
	label,
	options,
	disabled,
}) => (
	<RuleField label={label}>
		<Controller
			control={control}
			name="triggerType"
			render={({ field }) => (
				<RuleTriggerTypeTabs
					value={field.value}
					options={options}
					disabled={disabled}
					onChange={field.onChange}
				/>
			)}
		/>
	</RuleField>
);

RuleTriggerTypeControl.displayName = 'RuleTriggerTypeControl';

export { RuleTriggerTypeControl };
export type { RuleTriggerTypeControlProps };
