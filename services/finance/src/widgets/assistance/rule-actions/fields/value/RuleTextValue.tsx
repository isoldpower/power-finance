import { useCallback, useRef } from "react";
import { cn, FinanceInput } from "@internal/ui-library";
import { CalendarIcon } from "@shared/pure-components/icons";

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

const openPicker = (input: HTMLInputElement | null): void => {
	if (input === null) return;

	input.focus();

	try {
		input.showPicker();
	} catch {
		// Older browsers open the picker from the focused field instead.
	}
};

const RuleTextValue: FC<RuleTextValueProps> = ({ kind, value, multiple, disabled, onChange }) => {
	const inputRef = useRef<HTMLInputElement>(null);
	const isDate = kind === 'date' && !multiple;

	const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
		onChange(event.target.value);
	}, [onChange]);

	const handleOpenPicker = useCallback(() => {
		openPicker(inputRef.current);
	}, []);

	return (
		<div className="relative flex min-w-0 flex-1 items-center">
			<FinanceInput
				ref={inputRef}
				type={multiple ? 'text' : INPUT_TYPE[kind]}
				value={value}
				placeholder={multiple ? 'Comma-separated values' : PLACEHOLDER[kind]}
				aria-label="Condition value"
				className={cn("w-full", RULE_FIELD_TEXT, isDate && "date-bare pr-7")}
				disabled={disabled}
				onChange={handleChange}
			/>
			{isDate ? (
				<button
					type="button"
					aria-label="Open calendar"
					tabIndex={-1}
					disabled={disabled}
					onClick={handleOpenPicker}
					className={cn(
						"absolute right-2 flex items-center text-text-3 transition-colors",
						"hover:text-text-2 disabled:cursor-not-allowed disabled:opacity-50"
					)}
				>
					<CalendarIcon size={14} />
				</button>
			) : null}
		</div>
	);
};

RuleTextValue.displayName = 'RuleTextValue';

export { RuleTextValue };
export type { RuleTextValueProps };
