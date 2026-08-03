import { cn } from "@internal/ui-library";

import type { BaseHTMLAttributes, FC } from "react";


const CategoryPanelHint: FC<Omit<BaseHTMLAttributes<HTMLSpanElement>, 'className'>> = ({
	children,
	...props
}) => {
	return (
		<span
			className={cn(
				"font-numeric text-[10px] text-text-3"
			)}
			{...props}
		>
			{children}
		</span>
	);
}

CategoryPanelHint.displayName = 'CategoryPanelHint';

export { CategoryPanelHint };
