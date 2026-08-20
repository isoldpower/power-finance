import { cn } from "@internal/ui-library";
import { textClass } from "@shared/pure-components/typography";

import type { FC } from "react";


interface TransactionSearchFieldProps {
	value: string;
	onValueChange: (value: string) => void;
	placeholder?: string;
}

const TransactionSearchField: FC<TransactionSearchFieldProps> = ({
	value,
	onValueChange,
	placeholder,
}) => (
	<input
		value={value}
		onChange={(event) => { onValueChange(event.target.value); }}
		placeholder={placeholder}
		className={cn(
			textClass({ size: '13' }),
			"min-w-0 flex-1 border-none bg-transparent outline-none placeholder:text-[var(--text-3)]"
		)}
	/>
);

TransactionSearchField.displayName = 'TransactionSearchField';

export { TransactionSearchField };
export type { TransactionSearchFieldProps };
