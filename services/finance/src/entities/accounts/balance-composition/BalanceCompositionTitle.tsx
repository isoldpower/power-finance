import { cn } from "@internal/ui-library";

import type { BaseHTMLAttributes, FC } from "react";


const BalanceCompositionTitle: FC<Omit<BaseHTMLAttributes<HTMLSpanElement>, 'className'>> = ({
	children,
	...props
}) => {
	return (
		<span
			className={cn(
				"text-sm font-semibold"
			)}
			{...props}
		>
			{children}
		</span>
	);
}

BalanceCompositionTitle.displayName = 'BalanceCompositionTitle';

export { BalanceCompositionTitle };
