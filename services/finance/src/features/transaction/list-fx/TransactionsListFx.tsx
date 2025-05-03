import type { ReactNode } from "react";


interface TransactionsListFxProps {
	children: ReactNode;
	pending: ReactNode;
	error: ReactNode;
	status: 'pending' | 'error' | 'success';
}

const TransactionsListFx: React.FC<TransactionsListFxProps> = ({
	children,
	pending,
	error,
	status
}) => {
	if (status === 'pending') return pending;
	if (status === 'error') return error;

	return children;
}

TransactionsListFx.displayName = 'TransactionsListFx';

export { TransactionsListFx };
export type { TransactionsListFxProps };