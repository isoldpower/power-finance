import { cn } from "@internal/ui-library";
import { MetaText } from "@shared/pure-components/typography";

import type { BaseHTMLAttributes, FC, PropsWithChildren } from "react";
import type { Types } from "@shared/formatting";


type LedgerRowConvertedAmountProps = PropsWithChildren<
	Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'> & {
		tone: Types;
		converted: boolean;
	}
>;

const LedgerRowConvertedAmount: FC<LedgerRowConvertedAmountProps> = ({
	children,
	tone,
	converted,
	...props
}) => (
	<MetaText
		as="div"
		size="12"
		tone="default"
		className="hidden w-[104px] text-right md:block"
		{...props}
	>
		{converted ? (
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
