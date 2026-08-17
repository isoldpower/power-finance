import { LedgerLineSkeleton } from "@entity/transactions";

import type { FC, ReactNode } from "react";


const PLACEHOLDER_LINES = ['l1', 'l2'];

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
		{PLACEHOLDER_LINES.map((line) => (
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
