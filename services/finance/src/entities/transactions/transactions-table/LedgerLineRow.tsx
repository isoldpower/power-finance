import { cn } from "@internal/ui-library";
import { LedgerLineAccount } from "./ledger-line/LedgerLineAccount.tsx";
import { LedgerLineAmount } from "./ledger-line/LedgerLineAmount.tsx";
import { LedgerLineKind } from "./ledger-line/LedgerLineKind.tsx";
import { LedgerLineSide } from "./ledger-line/LedgerLineSide.tsx";

import type { BaseHTMLAttributes, FC, PropsWithChildren } from "react";
import type { LedgerLineAccountProps } from "./ledger-line/LedgerLineAccount.tsx";
import type { LedgerLineAmountProps } from "./ledger-line/LedgerLineAmount.tsx";
import type { LedgerLineKindProps } from "./ledger-line/LedgerLineKind.tsx";
import type { LedgerLineSideProps } from "./ledger-line/LedgerLineSide.tsx";


type LedgerLineRowProps = PropsWithChildren<Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>>;
type LedgerLineRowObject = FC<LedgerLineRowProps> & {
	Account: FC<LedgerLineAccountProps>;
	Amount: FC<LedgerLineAmountProps>;
	Kind: FC<LedgerLineKindProps>;
	Side: FC<LedgerLineSideProps>;
}

const LedgerLineRow: LedgerLineRowObject = ({
	children,
	...props
}) => (
	<div
		className={cn(
			"ml-[17px] mt-2 flex items-center gap-2.5 rounded-[9px]",
			"border border-border bg-card px-3 py-2.5"
		)}
		{...props}
	>
		{children}
	</div>
);

LedgerLineRow.Account = LedgerLineAccount;
LedgerLineRow.Amount = LedgerLineAmount;
LedgerLineRow.Kind = LedgerLineKind;
LedgerLineRow.Side = LedgerLineSide;
LedgerLineRow.displayName = 'LedgerLineRow';

export { LedgerLineRow };
export type { LedgerLineRowProps };
