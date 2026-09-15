import { useCallback } from "react";
import { cn, FinanceInput } from "@internal/ui-library";

import { RULE_FIELD_TEXT } from "../config.ts";

import type { ChangeEvent, FC } from "react";
import type { FilterInputKind } from "@feature/assistance";


interface RuleTextValueProps {
	kind: Extract<FilterInputKind, 'text' | 'number' | 'date'>;
	value: string;
	multiple: boolean;
	disabled?: boolean;
	onChange: (value: string) => void;
}

const INPUT_TYPE: Record<RuleTextValueProps['kind'], string> = {
	text: 'text',
	number: 'number',
	date: 'date',
};

const PLACEHOLDER: Record<RuleTextValueProps['kind'], string> = {
	text: 'Value to match',
	number: 'Amount to match',
	date: '',
};

const RuleTextValue: FC<RuleTextValueProps> = ({ kind, value, multiple, disabled, onChange }) => {
	const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
		onChange(event.target.value);
	}, [onChange]);

	return (
		<FinanceInput
			type={multiple ? 'text' : INPUT_TYPE[kind]}
			value={value}
			placeholder={multiple ? 'Comma-separated values' : PLACEHOLDER[kind]}
			aria-label="Condition value"
			className={cn("flex-1", RULE_FIELD_TEXT)}
			disabled={disabled}
			onChange={handleChange}
		/>
	);
};

RuleTextValue.displayName = 'RuleTextValue';

export { RuleTextValue };
export type { RuleTextValueProps };
