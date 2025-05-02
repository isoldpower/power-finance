import type { FC, ReactNode } from "react";

interface TransactionPaperProps {
	children?: ReactNode;
}

const TransactionPaper: FC<TransactionPaperProps> = ({ children }) => {
	return (
		<div className="flex items-center justify-between p-4 bg-white rounded-lg border">
			{children}
		</div>
	)
}

TransactionPaper.displayName = 'TransactionPaper';

export { TransactionPaper };
export type { TransactionPaperProps };