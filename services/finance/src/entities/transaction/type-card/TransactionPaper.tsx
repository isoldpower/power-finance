import type { FC, ReactNode } from "react";

interface TransactionPaperProps {
	children?: ReactNode;
}

const TransactionPaper: FC<TransactionPaperProps> = ({ children }) => {
	return (
		<div className="flex shadow-xs items-center justify-between p-4 bg-white first:rounded-t-lg last:rounded-b-lg border">
			{children}
		</div>
	)
}

TransactionPaper.displayName = 'TransactionPaper';

export { TransactionPaper };
export type { TransactionPaperProps };