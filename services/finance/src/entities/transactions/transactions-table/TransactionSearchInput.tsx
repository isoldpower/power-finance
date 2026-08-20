import { cn } from "@internal/ui-library";
import { TransactionSearchClear } from "./search-input/TransactionSearchClear.tsx";
import { TransactionSearchField } from "./search-input/TransactionSearchField.tsx";
import { TransactionSearchIcon } from "./search-input/TransactionSearchIcon.tsx";

import type { BaseHTMLAttributes, FC, PropsWithChildren } from "react";
import type { TransactionSearchClearProps } from "./search-input/TransactionSearchClear.tsx";
import type { TransactionSearchFieldProps } from "./search-input/TransactionSearchField.tsx";


type TransactionSearchInputProps = PropsWithChildren<
	Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>
>;
type TransactionSearchInputObject = FC<TransactionSearchInputProps> & {
	Clear: FC<TransactionSearchClearProps>;
	Field: FC<TransactionSearchFieldProps>;
	Icon: FC;
}

const TransactionSearchInput: TransactionSearchInputObject = ({
	children,
	...props
}) => (
	<div
		className={cn(
			"flex min-w-[220px] flex-1 items-center gap-2 rounded-[var(--radius-md)]",
			"border border-border-strong px-3 py-2 focus-within:border-[var(--accent-border)]"
		)}
		{...props}
	>
		{children}
	</div>
);

TransactionSearchInput.Clear = TransactionSearchClear;
TransactionSearchInput.Field = TransactionSearchField;
TransactionSearchInput.Icon = TransactionSearchIcon;
TransactionSearchInput.displayName = 'TransactionSearchInput';

export { TransactionSearchInput };
export type { TransactionSearchInputProps };
