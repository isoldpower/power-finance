import { useMemo } from "react";
import { cn } from "@internal/ui-library";
import { TransactionRowAmount } from "./row/TransactionRowAmount.tsx";
import { TransactionRowNative } from "./row/TransactionRowNative.tsx";
import { TransactionRowTitle } from "./row/TransactionRowTitle.tsx";

import type { FC, PropsWithChildren } from "react";
import type { TransactionRowAmountProps } from "./row/TransactionRowAmount.tsx";
import type { TransactionRowNativeProps } from "./row/TransactionRowNative.tsx";
import type { TransactionRowTitleProps } from "./row/TransactionRowTitle.tsx";


type TransactionRowProps = PropsWithChildren<{
	color: string;
	delay: number;
}>;
type TransactionRowObject = FC<TransactionRowProps> & {
	Amount: FC<TransactionRowAmountProps>;
	Native: FC<TransactionRowNativeProps>;
	Title: FC<TransactionRowTitleProps>;
};

const TransactionRow: TransactionRowObject = ({ color, delay, children }) => {
	const style = useMemo(() => {
		return { animationDelay: `${delay.toString()}ms` };
	}, [delay]);

	const dotStyle = useMemo(() => {
		return { background: color };
	}, [color]);

	return (
		<li
			className={cn(
				"fx-slidein flex items-center gap-3 rounded-[var(--radius-md)] px-2.5 py-2",
				"transition-colors hover:bg-secondary",
			)}
			style={style}
		>
			<span className="size-2 shrink-0 rounded-full" style={dotStyle} />
			{children}
		</li>
	);
};

TransactionRow.Amount = TransactionRowAmount;
TransactionRow.Native = TransactionRowNative;
TransactionRow.Title = TransactionRowTitle;
TransactionRow.displayName = 'TransactionRow';

export { TransactionRow };
export type { TransactionRowProps };
