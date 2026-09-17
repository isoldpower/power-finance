import { LedgerLineSkeleton } from "@entity/transactions";
import { Caption } from "@shared/pure-components/typography";

import type { FC, ReactNode } from "react";
import type { LedgerState } from "../data-presenters";


interface TransactionLedgerFxProps {
	isPending: boolean;
	ledgerState: LedgerState;
	children: ReactNode;
}

const TransactionLedgerFx: FC<TransactionLedgerFxProps> = ({
	isPending,
	ledgerState,
	children,
}) => {
	if (isPending || ledgerState === 'dispatching') {
		return <LedgerLinesSkeleton />;
	} else if (ledgerState === 'unavailable') {
		return <LedgerLinesUnavailable />;
	}

	return children;
};

const LedgerLinesUnavailable: FC = () => (
	<Caption size="12.5" className="ml-[34px] mt-2 px-3 py-2.5">
		No postings were derived for this transaction yet.
	</Caption>
);

const LedgerLinesSkeleton: FC = () => (
	<>
		{['l1', 'l2'].map((line, index, lines) => (
			<LedgerLineSkeleton key={line} last={index === lines.length - 1}>
				<LedgerLineSkeleton.Side />
				<LedgerLineSkeleton.Account />
				<LedgerLineSkeleton.Kind />
				<LedgerLineSkeleton.Amount />
			</LedgerLineSkeleton>
		))}
	</>
);

LedgerLinesSkeleton.displayName = 'LedgerLinesSkeleton';
LedgerLinesUnavailable.displayName = 'LedgerLinesUnavailable';

TransactionLedgerFx.displayName = 'TransactionLedgerFx';

export { TransactionLedgerFx };
export type { TransactionLedgerFxProps };
