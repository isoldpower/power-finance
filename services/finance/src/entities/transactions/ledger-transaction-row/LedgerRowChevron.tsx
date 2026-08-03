import { cn } from "@internal/ui-library";

import type { BaseHTMLAttributes, FC } from "react";


interface LedgerRowChevronProps extends Omit<BaseHTMLAttributes<HTMLDivElement>, 'className' | 'children'> {
	expanded: boolean;
}

const LedgerRowChevron: FC<LedgerRowChevronProps> = ({
	expanded,
	...props
}) => {
	return (
		<div
			className={cn(
				"w-[26px] text-right"
			)}
			{...props}
		>
			<span
				className={cn(
					"inline-block text-[11px] text-text-3 transition-transform",
					expanded && "rotate-180",
				)}
			>
				▾
			</span>
		</div>
	);
}

LedgerRowChevron.displayName = 'LedgerRowChevron';

export { LedgerRowChevron };
