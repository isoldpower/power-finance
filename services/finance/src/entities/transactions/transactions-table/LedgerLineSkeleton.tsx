import { cn } from "@internal/ui-library";
import { LedgerLineSkeletonAccount } from "./line-skeleton/LedgerLineSkeletonAccount.tsx";
import { LedgerLineSkeletonAmount } from "./line-skeleton/LedgerLineSkeletonAmount.tsx";
import { LedgerLineRail } from "./ledger-line/LedgerLineRail.tsx";
import { LedgerLineSkeletonKind } from "./line-skeleton/LedgerLineSkeletonKind.tsx";
import { LedgerLineSkeletonSide } from "./line-skeleton/LedgerLineSkeletonSide.tsx";

import type { BaseHTMLAttributes, FC, PropsWithChildren } from "react";


type LedgerLineSkeletonProps = PropsWithChildren<
	Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>
> & {
	last?: boolean;
};
type LedgerLineSkeletonObject = FC<LedgerLineSkeletonProps> & {
	Account: FC;
	Amount: FC;
	Kind: FC;
	Side: FC;
}

const LedgerLineSkeleton: LedgerLineSkeletonObject = ({
	children,
	last = false,
	...props
}) => (
	<div className="flex items-stretch" {...props}>
		<LedgerLineRail last={last} />
		<div
			className={cn(
				"mt-2 flex min-w-0 flex-1 items-center gap-2.5 rounded-[9px]",
				"border border-border bg-card px-3 py-2.5"
			)}
		>
			{children}
		</div>
	</div>
);

LedgerLineSkeleton.Account = LedgerLineSkeletonAccount;
LedgerLineSkeleton.Amount = LedgerLineSkeletonAmount;
LedgerLineSkeleton.Kind = LedgerLineSkeletonKind;
LedgerLineSkeleton.Side = LedgerLineSkeletonSide;
LedgerLineSkeleton.displayName = 'LedgerLineSkeleton';

export { LedgerLineSkeleton };
export type { LedgerLineSkeletonProps };
