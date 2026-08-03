import { cn } from "@internal/ui-library";

import type { BaseHTMLAttributes, FC } from "react";


const HistoryToolbarHint: FC<Omit<BaseHTMLAttributes<HTMLSpanElement>, 'className'>> = ({
	children,
	...props
}) => {
	return (
		<span
			className={cn(
				"hidden font-numeric text-[10px] text-text-3 sm:block"
			)}
			{...props}
		>
			{children}
		</span>
	);
}

HistoryToolbarHint.displayName = 'HistoryToolbarHint';

export { HistoryToolbarHint };
