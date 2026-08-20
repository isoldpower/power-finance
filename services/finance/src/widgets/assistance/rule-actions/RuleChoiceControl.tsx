import { Controller } from "react-hook-form";

import { RuleField } from "./fields/RuleField.tsx";
import { RuleSelectField } from "./fields/RuleSelectField.tsx";

import type { FC } from "react";
import type { Control } from "react-hook-form";
import type { RuleFormSchema } from "@feature/assistance";
import type { SelectOption } from "@shared/forms";


type RuleChoiceName = 'event' | 'schedule' | 'effectType' | 'severity';

interface RuleChoiceControlProps {
	control: Control<RuleFormSchema>;
	name: RuleChoiceName;
	label: string;
	options: SelectOption[];
	ariaLabel: string;
	placeholder?: string;
	error?: string;
	disabled?: boolean;
}

const RuleChoiceControl: FC<RuleChoiceControlProps> = ({
	control,
	name,
	label,
	options,
	ariaLabel,
	placeholder,
	error,
	disabled,
}) => (
	<RuleField label={label} error={error}>
		<Controller
			control={control}
			name={name}
			render={({ field }) => (
				<RuleSelectField
					value={field.value}
					options={options}
					ariaLabel={ariaLabel}
					placeholder={placeholder}
					disabled={disabled}
					onChange={field.onChange}
				/>
			)}
		/>
	</RuleField>
);

RuleChoiceControl.displayName = 'RuleChoiceControl';

export { RuleChoiceControl };
export type { RuleChoiceControlProps, RuleChoiceName };
