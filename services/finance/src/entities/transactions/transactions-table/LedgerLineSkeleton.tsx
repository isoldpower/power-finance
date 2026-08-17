import { cn } from "@internal/ui-library";
import { LedgerLineSkeletonAccount } from "./line-skeleton/LedgerLineSkeletonAccount.tsx";
import { LedgerLineSkeletonAmount } from "./line-skeleton/LedgerLineSkeletonAmount.tsx";
import { LedgerLineSkeletonKind } from "./line-skeleton/LedgerLineSkeletonKind.tsx";
import { LedgerLineSkeletonSide } from "./line-skeleton/LedgerLineSkeletonSide.tsx";

import type { BaseHTMLAttributes, FC, PropsWithChildren } from "react";


type LedgerLineSkeletonProps = PropsWithChildren<
	Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>
>;
type LedgerLineSkeletonObject = FC<LedgerLineSkeletonProps> & {
	Account: FC;
	Amount: FC;
	Kind: FC;
	Side: FC;
}

const LedgerLineSkeleton: LedgerLineSkeletonObject = ({
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

LedgerLineSkeleton.Account = LedgerLineSkeletonAccount;
LedgerLineSkeleton.Amount = LedgerLineSkeletonAmount;
LedgerLineSkeleton.Kind = LedgerLineSkeletonKind;
LedgerLineSkeleton.Side = LedgerLineSkeletonSide;
LedgerLineSkeleton.displayName = 'LedgerLineSkeleton';

export { LedgerLineSkeleton };
export type { LedgerLineSkeletonProps };
