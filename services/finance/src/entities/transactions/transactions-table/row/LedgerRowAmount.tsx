import { cn } from "@internal/ui-library";
import { MetaText } from "@shared/pure-components/typography";

import type { BaseHTMLAttributes, FC, PropsWithChildren } from "react";
import type { Types } from "@shared/formatting";


type LedgerRowAmountProps = PropsWithChildren<Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'> & {
	tone: Types;
}>;

const LedgerRowAmount: FC<LedgerRowAmountProps> = ({
	children,
	tone,
	...props
}) => (
	<MetaText
		as="div"
		size="12"
		tone="default"
		className={cn(
			"w-[104px] text-right",
			tone === 'pos' && "text-pos",
			tone === 'neg' && "text-neg",
			(tone === 'neutral' || tone === 'muted') && "text-text-2"
		)}
		{...props}
	>
		{children}
	</MetaText>
);

LedgerRowAmount.displayName = 'LedgerRowAmount';

export { LedgerRowAmount };
export type { LedgerRowAmountProps };
