import { cn } from "@internal/ui-library";

import type { BaseHTMLAttributes, FC } from "react";


const HistoryToolbarTitle: FC<Omit<BaseHTMLAttributes<HTMLSpanElement>, 'className'>> = ({
	children,
	...props
}) => {
	return (
		<span
			className={cn(
				"text-[13.5px] font-semibold"
			)}
			{...props}
		>
			{children}
		</span>
	);
}

HistoryToolbarTitle.displayName = 'HistoryToolbarTitle';

export { HistoryToolbarTitle };
