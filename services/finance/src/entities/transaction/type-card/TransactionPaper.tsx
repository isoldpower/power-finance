import type { FC, ReactNode } from "react";


interface TransactionPaperProps {
	children?: ReactNode;
}

const TransactionPaper: FC<TransactionPaperProps> = ({ children }) => {
	return (
		<div className="p-4 last:border-b-0 bg-card transition-colors">
			{children}
		</div>
	)
}

TransactionPaper.displayName = 'TransactionPaper';

export { TransactionPaper };
export type { TransactionPaperProps };