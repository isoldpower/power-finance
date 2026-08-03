import { cn } from "@internal/ui-library";

import type { BaseHTMLAttributes, FC } from "react";


const BalanceCompositionContainer: FC<Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>> = ({
	children,
	...props
}) => {
	return (
		<div
			className={cn(
				"flex flex-wrap items-center gap-2.5 border-b border-border px-[18px] py-3.5"
			)}
			{...props}
		>
			{children}
		</div>
	);
}

BalanceCompositionContainer.displayName = 'BalanceCompositionContainer';

export { BalanceCompositionContainer };
