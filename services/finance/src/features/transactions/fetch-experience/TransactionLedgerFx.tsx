import { LedgerLineSkeleton } from "@entity/transactions";

import type { FC, ReactNode } from "react";


interface TransactionLedgerFxProps {
	isPending: boolean;
	children: ReactNode;
}

const TransactionLedgerFx: FC<TransactionLedgerFxProps> = ({ isPending, children }) => {
	if (isPending) {
		return <LedgerLinesSkeleton />;
	}

	return children;
};

const LedgerLinesSkeleton: FC = () => (
	<>
		{['l1', 'l2'].map((line) => (
			<LedgerLineSkeleton key={line}>
				<LedgerLineSkeleton.Side />
				<LedgerLineSkeleton.Account />
				<LedgerLineSkeleton.Kind />
				<LedgerLineSkeleton.Amount />
			</LedgerLineSkeleton>
		))}
	</>
);

LedgerLinesSkeleton.displayName = 'LedgerLinesSkeleton';

TransactionLedgerFx.displayName = 'TransactionLedgerFx';

export { TransactionLedgerFx };
export type { TransactionLedgerFxProps };
