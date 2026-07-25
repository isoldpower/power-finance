import {FC, ReactNode} from "react";

interface RecentTransactionContainerProps {
	children: ReactNode;
}

const RecentTransactionContainer: FC<RecentTransactionContainerProps> = ({ children }) => (
	<div className="flex items-center gap-3 border-b border-border px-[18px] py-2.5 hover:bg-surface-2">
		{children}
	</div>
);

export { RecentTransactionContainer };