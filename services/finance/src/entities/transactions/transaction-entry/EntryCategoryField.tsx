import { FinanceChip } from "@internal/ui-library";

import type { FC } from "react";
import type { CategoryRef } from "@entity/categories";


interface EntryCategoryFieldProps {
	options: CategoryRef[];
	value: CategoryRef | null;
	onChange: (value: CategoryRef | null) => void;
	className?: string;
}

const EntryCategoryField: FC<EntryCategoryFieldProps> = ({ options, value, onChange, className }) => (
	<div className={className}>
		<div className="flex flex-wrap gap-1.5">
			{options.map((option) => (
				<FinanceChip
					key={option.id}
					pressed={value?.id === option.id}
					onPressedChange={(pressed) => { onChange(pressed ? option : null); }}
				>
					{option.name}
				</FinanceChip>
			))}
		</div>
	</div>
);

EntryCategoryField.displayName = 'EntryCategoryField';

export { EntryCategoryField };
export type { EntryCategoryFieldProps };
