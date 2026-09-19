import { useCallback, useMemo } from "react";
import { RuleForm } from "@entity/assistance";
import { formatMultiValue, parseMultiValue } from "@feature/assistance";

import { RuleSelectField } from "../RuleSelectField.tsx";
import { VALUE_SEPARATOR } from "./config.ts";

import type { FC } from "react";
import type { SelectOption } from "@shared/forms";


interface RuleOptionValueProps {
	value: string;
	options: SelectOption[];
	multiple: boolean;
	searchable: boolean;
	placeholder: string;
	searchPlaceholder: string;
	emptyLabel: string;
	disabled?: boolean;
	onChange: (value: string) => void;
}

const labelFor = (options: SelectOption[], value: string): string => (
	options.find((option) => option.value === value)?.label ?? value
);

const RuleOptionValue: FC<RuleOptionValueProps> = ({
	value,
	options,
	multiple,
	searchable,
	placeholder,
	searchPlaceholder,
	emptyLabel,
	disabled,
	onChange,
}) => {
	const picked = useMemo(() => (multiple ? parseMultiValue(value) : []), [multiple, value]);

	const label = useMemo(() => {
		if (!multiple) return value === '' ? placeholder : labelFor(options, value);
		if (picked.length === 0) return placeholder;

		return picked.map((entry) => labelFor(options, entry)).join(VALUE_SEPARATOR);
	}, [multiple, options, picked, placeholder, value]);

	const handleSelect = useCallback((next: string) => {
		if (!multiple) {
			onChange(next);

			return;
		}

		onChange(picked.includes(next)
			? formatMultiValue(picked.filter((entry) => entry !== next))
			: formatMultiValue([...picked, next]));
	}, [multiple, onChange, picked]);

	if (!multiple && !searchable) {
		return (
			<RuleSelectField
				value={value}
				options={options}
				ariaLabel="Condition value"
				placeholder={placeholder}
				className="flex-1"
				disabled={disabled}
				onChange={onChange}
			/>
		);
	}

	return (
		<RuleForm.ValueCombobox>
			<RuleForm.ValueTrigger
				label={label}
				unset={multiple ? picked.length === 0 : value === ''}
				ariaLabel="Condition value"
				className="min-w-0 flex-1"
				disabled={disabled}
			/>
			<RuleForm.ValueContent>
				<RuleForm.ValueSearch placeholder={searchPlaceholder} />
				<RuleForm.ValueList>
					<RuleForm.ValueEmpty>
						{emptyLabel}
					</RuleForm.ValueEmpty>
					{options.map((option) => (
						<RuleForm.ValueOption
							key={option.value}
							value={option.value}
							label={option.label}
							selected={picked.includes(option.value)}
							onSelect={handleSelect}
						/>
					))}
				</RuleForm.ValueList>
			</RuleForm.ValueContent>
		</RuleForm.ValueCombobox>
	);
};

RuleOptionValue.displayName = 'RuleOptionValue';

export { RuleOptionValue };
export type { RuleOptionValueProps };
