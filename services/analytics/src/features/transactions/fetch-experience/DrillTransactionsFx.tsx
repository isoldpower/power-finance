import { ChartMessage } from "@shared/charts";
import { QueryFx } from "@shared/feedback";
import { DrillListSkeleton } from "./fx-partials/DrillListSkeleton.tsx";

import type { FC, ReactNode } from "react";
import type { DrillTransactions } from "@entity/transactions";


interface DrillTransactionsFxProps {
	isPending: boolean;
	isError: boolean;
	transactions: DrillTransactions | undefined;
	children: (transactions: DrillTransactions) => ReactNode;
}

const ERROR_HEIGHT = 160;

const DrillTransactionsFx: FC<DrillTransactionsFxProps> = ({ isPending, isError, transactions, children }) => (
	<QueryFx
		isPending={isPending}
		isError={isError}
		data={transactions}
		pending={<DrillListSkeleton />}
		error={<ChartMessage height={ERROR_HEIGHT} title="Couldn’t load transactions" />}
	>
		{children}
	</QueryFx>
);

DrillTransactionsFx.displayName = 'DrillTransactionsFx';

export { DrillTransactionsFx };
export type { DrillTransactionsFxProps };
