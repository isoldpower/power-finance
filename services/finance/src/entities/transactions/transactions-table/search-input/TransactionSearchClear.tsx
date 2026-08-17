import { textClass } from "@shared/pure-components/typography";

import type { ButtonHTMLAttributes, FC, PropsWithChildren } from "react";


type TransactionSearchClearProps = PropsWithChildren<
	Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'type'>
>;

const TransactionSearchClear: FC<TransactionSearchClearProps> = ({
	children,
	...props
}) => (
	<button
		type="button"
		className={textClass({ size: 'sm', leading: 'none', tone: 'subtle' })}
		{...props}
	>
		{children}
	</button>
);

TransactionSearchClear.displayName = 'TransactionSearchClear';

export { TransactionSearchClear };
export type { TransactionSearchClearProps };
