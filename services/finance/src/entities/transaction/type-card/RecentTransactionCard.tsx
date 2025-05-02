import { ArrowUpRight, ArrowDownLeft, ArrowLeftRight, MoreHorizontal } from 'lucide-react';
import type { TransactionType } from "@entity/transaction";

import { useState } from "react";
import type { ReactElement } from "react";


interface RecentTransactionCardProps {
	type: TransactionType;
}

const RecentTransactionCard: React.FC<RecentTransactionCardProps> = ({ type }) => {
	const [item, setItem] = useState<ReactElement>();

	switch (type) {
		case 'income':
			setItem(<ArrowDownLeft className="text-green-500" />);
			break;
		case 'expense':
			setItem(<ArrowUpRight className="text-red-500" />);
			break;
		case 'transfer':
			setItem(<ArrowLeftRight className="text-blue-500" />);
			break;
		default:
			setItem(<MoreHorizontal className="text-purple-500" />);
			break;
	}

	return (
		<div className="w-8 h-8 flex-shrink-0 bg-gray-100 rounded-full flex items-center justify-center">
			{item}
		</div>
	);
};

RecentTransactionCard.displayName = 'RecentTransactionCard';

export { RecentTransactionCard };
export type { RecentTransactionCardProps };