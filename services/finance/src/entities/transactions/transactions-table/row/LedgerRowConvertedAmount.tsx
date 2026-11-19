import { cn } from "@internal/ui-library";
import { MetaText } from "@internal/shared";
import type { Types } from "@internal/shared";

import type { BaseHTMLAttributes, FC, PropsWithChildren } from "react";


type LedgerRowConvertedAmountProps = PropsWithChildren<
	Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'> & {
		tone: Types;
		inTarget: boolean;
	}
>;

const LedgerRowConvertedAmount: FC<LedgerRowConvertedAmountProps> = ({
	children,
	tone,
	inTarget,
	...props
}) => (
	<MetaText
		as="div"
		size="12"
		tone="default"
		className="hidden w-[104px] text-right md:block"
		{...props}
	>
		{inTarget ? (
			<span
				className={cn(
					tone === 'pos' && "text-pos",
					tone === 'neg' && "text-neg",
					(tone === 'neutral' || tone === 'muted') && "text-text-2"
				)}
			>
				{children}
			</span>
		) : (
			<span className="text-text-3">—</span>
		)}
	</MetaText>
);

LedgerRowConvertedAmount.displayName = 'LedgerRowConvertedAmount';

export { LedgerRowConvertedAmount };
export type { LedgerRowConvertedAmountProps };
