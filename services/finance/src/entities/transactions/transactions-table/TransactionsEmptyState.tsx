import { cn } from "@internal/ui-library";
import { TransactionsEmptyHint } from "./empty-state/TransactionsEmptyHint.tsx";
import { TransactionsEmptyIcon } from "./empty-state/TransactionsEmptyIcon.tsx";
import { TransactionsEmptyTitle } from "./empty-state/TransactionsEmptyTitle.tsx";

import type { BaseHTMLAttributes, FC, PropsWithChildren } from "react";
import type { TransactionsEmptyHintProps } from "./empty-state/TransactionsEmptyHint.tsx";
import type { TransactionsEmptyIconProps } from "./empty-state/TransactionsEmptyIcon.tsx";
import type { TransactionsEmptyTitleProps } from "./empty-state/TransactionsEmptyTitle.tsx";


type TransactionsEmptyStateProps = PropsWithChildren<
	Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>
>;
type TransactionsEmptyStateObject = FC<TransactionsEmptyStateProps> & {
	Hint: FC<TransactionsEmptyHintProps>;
	Icon: FC<TransactionsEmptyIconProps>;
	Title: FC<TransactionsEmptyTitleProps>;
}

const TransactionsEmptyState: TransactionsEmptyStateObject = ({
	children,
	...props
}) => (
	<div
		className={cn(
			"flex flex-col items-center justify-center gap-1.5 px-5 py-10 text-center"
		)}
		{...props}
	>
		{children}
	</div>
);

TransactionsEmptyState.Hint = TransactionsEmptyHint;
TransactionsEmptyState.Icon = TransactionsEmptyIcon;
TransactionsEmptyState.Title = TransactionsEmptyTitle;
TransactionsEmptyState.displayName = 'TransactionsEmptyState';

export { TransactionsEmptyState };
export type { TransactionsEmptyStateProps };
