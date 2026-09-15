import { useCallback, useMemo } from "react";
import { RuleForm } from "@entity/assistance";
import { formatMultiValue, parseMultiValue } from "@feature/assistance";

import { RuleSelectField } from "../RuleSelectField.tsx";

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
	const tokens = useMemo(
		() => picked.map((entry) => ({ value: entry, label: labelFor(options, entry) })),
		[options, picked]
	);
	const pickable = useMemo(
		() => (multiple ? options.filter((option) => !picked.includes(option.value)) : options),
		[multiple, options, picked]
	);

	const handlePick = useCallback((next: string) => {
		onChange(multiple ? formatMultiValue([...picked, next]) : next);
	}, [multiple, onChange, picked]);

	const handleRemove = useCallback((next: string) => {
		onChange(formatMultiValue(picked.filter((entry) => entry !== next)));
	}, [onChange, picked]);

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
		<div className="flex min-w-0 flex-1 flex-col gap-1">
			<RuleForm.ValueCombobox
				label={multiple ? placeholder : (value === '' ? placeholder : labelFor(options, value))}
				unset={multiple || value === ''}
				options={pickable}
				searchPlaceholder={searchPlaceholder}
				emptyLabel={emptyLabel}
				ariaLabel="Condition value"
				disabled={disabled}
				onSelect={handlePick}
			/>
			{multiple ? (
				<RuleForm.ValueTokens tokens={tokens} disabled={disabled} onRemove={handleRemove} />
			) : null}
		</div>
	);
};

RuleOptionValue.displayName = 'RuleOptionValue';

export { RuleOptionValue };
export type { RuleOptionValueProps };
