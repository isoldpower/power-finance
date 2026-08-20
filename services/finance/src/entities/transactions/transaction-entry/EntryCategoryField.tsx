import { FinanceChip } from "@internal/ui-library";

import type { FC } from "react";


interface EntryCategoryFieldProps {
	options: string[];
	value: string;
	onChange: (value: string) => void;
	className?: string;
}

const EntryCategoryField: FC<EntryCategoryFieldProps> = ({ options, value, onChange, className }) => (
	<div className={className}>
		<div className="flex flex-wrap gap-1.5">
			{options.map((option) => (
				<FinanceChip key={option} pressed={value === option} onPressedChange={() => { onChange(option); }}>
					{option}
				</FinanceChip>
			))}
		</div>
	</div>
);

EntryCategoryField.displayName = 'EntryCategoryField';

export { EntryCategoryField };
export type { EntryCategoryFieldProps };
