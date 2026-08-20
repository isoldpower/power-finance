import { cn } from "@internal/ui-library";
import { Caption } from "@shared/pure-components/typography";

import type { BaseHTMLAttributes, FC } from "react";


type LedgerRowChevronProps = Omit<BaseHTMLAttributes<HTMLDivElement>, 'className' | 'children'> & {
	expanded: boolean;
};

const LedgerRowChevron: FC<LedgerRowChevronProps> = ({
	expanded,
	...props
}) => (
	<div
		className={cn(
			"w-[26px] text-right"
		)}
		{...props}
	>
		<Caption
			as="span"
			size="11"
			className={cn(
				"inline-block transition-transform",
				expanded && "rotate-180"
			)}
		>
			▾
		</Caption>
	</div>
);

LedgerRowChevron.displayName = 'LedgerRowChevron';

export { LedgerRowChevron };
export type { LedgerRowChevronProps };
