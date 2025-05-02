import type { FC, ReactNode } from "react";

interface TransactionsListProps {
  children: ReactNode;
}

const TransactionsList: FC<TransactionsListProps> = ({ children }) => {
  return (
	<div className="grid">
	  {children}
	</div>
  )
}

TransactionsList.displayName = 'TransactionsList';

export { TransactionsList };
export type { TransactionsListProps };