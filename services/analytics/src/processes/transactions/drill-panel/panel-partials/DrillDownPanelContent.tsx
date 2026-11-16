import { MetaText } from "@internal/shared";
import { DrillPanel, drillProgressLabel } from "@entity/transactions";
import { useAnalyticsQuery } from "@feature/filters";
import { ShowOnPresent, useSelectedOption } from "@feature/interactions";
import {
	DrillTransactionsFx,
	useCloseDrill,
	useDrillRange,
	useDrillTransactions,
	useEscapeKey,
} from "@feature/transactions";
import {
	DrillHeader,
	DrillSummary,
	DrillTransactionsList,
	ORDER_OPTIONS,
} from "@widget/transactions";
import { SegmentedSwitch } from "@shared/charts";

import type { FC } from "react";
import type { Drill } from "@entity/filters";
import type { TransactionsOrder } from "@entity/transactions";


interface DrillDownPanelContentProps {
	drill: Drill;
}

const DrillDownPanelContent: FC<DrillDownPanelContentProps> = ({ drill }) => {
	const query = useAnalyticsQuery();
	const closeDrill = useCloseDrill();
	const order = useSelectedOption<TransactionsOrder>('amount_desc');
	const { transactions, isPending, isError } = useDrillTransactions(drill, query, order.selected);
	const range = useDrillRange(drill, query);

	useEscapeKey(true, closeDrill);

	return (
		<DrillPanel label="Transaction details" onClose={closeDrill}>
			<DrillHeader drill={drill} range={range} onClose={closeDrill} />
			<ShowOnPresent value={transactions}>
				{(loaded) => <DrillSummary transactions={loaded} />}
			</ShowOnPresent>
			<DrillPanel.Body
				toolbar={(
					<>
						<MetaText size="11">
							{drillProgressLabel(transactions)}
						</MetaText>
						<SegmentedSwitch
							label="Order"
							value={order.selected}
							options={ORDER_OPTIONS}
							onChange={order.select}
						/>
					</>
				)}
			>
				<DrillTransactionsFx
					isPending={isPending}
					isError={isError}
					transactions={transactions}
				>
					{(loaded) => <DrillTransactionsList transactions={loaded} />}
				</DrillTransactionsFx>
			</DrillPanel.Body>
		</DrillPanel>
	);
};

DrillDownPanelContent.displayName = 'DrillDownPanelContent';

export { DrillDownPanelContent };
export type { DrillDownPanelContentProps };
