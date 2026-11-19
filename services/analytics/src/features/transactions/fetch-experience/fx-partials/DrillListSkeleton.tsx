import { TransactionList, TransactionRowSkeleton } from "@entity/transactions";

import type { FC } from "react";


const DRILL_SKELETON_ROWS = 8;

const DrillListSkeleton: FC = () => (
	<TransactionList label="Loading transactions">
		{Array.from({ length: DRILL_SKELETON_ROWS }, (_, index) => <TransactionRowSkeleton key={index} />)}
	</TransactionList>
);

DrillListSkeleton.displayName = 'DrillListSkeleton';

export { DrillListSkeleton };
