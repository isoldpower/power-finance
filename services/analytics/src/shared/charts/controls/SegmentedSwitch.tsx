import { FinanceSegmented, FinanceSegmentedItem } from "@internal/ui-library";

import type { ReactNode } from "react";


interface SegmentedOption<T extends string> {
	value: T;
	label: ReactNode;
	disabled?: boolean;
}

interface SegmentedSwitchProps<T extends string> {
	label: string;
	value: T;
	options: readonly SegmentedOption<T>[];
	onChange: (value: T) => void;
}

function SegmentedSwitch<T extends string>({ label, value, options, onChange }: SegmentedSwitchProps<T>): ReactNode {
	const handleChange = (next: string): void => {
		const option = options.find((candidate) => candidate.value === next);
		if (option) {
			onChange(option.value);
		}
	};

	return (
		<FinanceSegmented value={value} onValueChange={handleChange} aria-label={label}>
			{options.map((option) => (
				<FinanceSegmentedItem
					key={option.value}
					value={option.value}
					disabled={option.disabled}
					className="h-7 px-2.5 text-[12px]"
				>
					{option.label}
				</FinanceSegmentedItem>
			))}
		</FinanceSegmented>
	);
}

SegmentedSwitch.displayName = 'SegmentedSwitch';

export { SegmentedSwitch };
export type { SegmentedOption, SegmentedSwitchProps };
