import { RuleSelectField } from "../RuleSelectField.tsx";
import { BOOLEAN_VALUE_OPTIONS } from "./config.ts";

import type { FC } from "react";


interface RuleBooleanValueProps {
	value: string;
	disabled?: boolean;
	onChange: (value: string) => void;
}

const RuleBooleanValue: FC<RuleBooleanValueProps> = ({ value, disabled, onChange }) => (
	<RuleSelectField
		value={value}
		options={BOOLEAN_VALUE_OPTIONS}
		ariaLabel="Condition value"
		placeholder="Yes or no"
		className="min-w-0 flex-1"
		disabled={disabled}
		onChange={onChange}
	/>
);

RuleBooleanValue.displayName = 'RuleBooleanValue';

export { RuleBooleanValue };
export type { RuleBooleanValueProps };
