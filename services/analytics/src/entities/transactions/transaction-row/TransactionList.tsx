import type { FC, PropsWithChildren } from "react";


type TransactionListProps = PropsWithChildren<{
	label: string;
}>;

const TransactionList: FC<TransactionListProps> = ({ label, children }) => (
	<ul aria-label={label} className="flex flex-col gap-0.5">
		{children}
	</ul>
);

TransactionList.displayName = 'TransactionList';

export { TransactionList };
export type { TransactionListProps };
