import { useCallback } from "react";

import type { ChangeEvent, FC } from "react";


interface RangePickerInputProps {
	label: string;
	value: string;
	min?: string;
	max?: string;
	onChange: (value: string) => void;
}

const RangePickerInput: FC<RangePickerInputProps> = ({ label, value, min, max, onChange }) => {
	const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
		onChange(event.target.value);
	}, [onChange]);

	return (
		<input
			type="date"
			aria-label={label}
			value={value}
			min={min}
			max={max}
			onChange={handleChange}
			className="bg-transparent font-numeric text-[12px] text-foreground outline-none"
		/>
	);
};

RangePickerInput.displayName = 'RangePickerInput';

export { RangePickerInput };
export type { RangePickerInputProps };
