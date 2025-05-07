import { Icons } from '@internal/ui-library';
import type { TransactionType } from "@entity/transaction";

import { useMemo } from "react";


interface TransactionTypeIconProps {
	type: TransactionType;
}

const TransactionTypeIcon: React.FC<TransactionTypeIconProps> = ({ type }) => {
	const item = useMemo(() => {
		switch (type) {
			case 'income':
				return <Icons.ArrowDownLeft className="text-green-500" />;
			case 'expense':
				return <Icons.ArrowUpRight className="text-red-500" />;
			case 'transfer':
				return <Icons.ArrowLeftRight className="text-blue-500" />;
			default:
				return <Icons.MoreHorizontal className="text-purple-500" />;
		}
	}, [type]);

	return (
		<div className="w-8 h-8 p-2 flex-shrink-0 bg-gray-100 rounded-full flex items-center justify-center">
			{item}
		</div>
	);
};

TransactionTypeIcon.displayName = 'TransactionTypeIcon';

export { TransactionTypeIcon };
export type { TransactionTypeIconProps };