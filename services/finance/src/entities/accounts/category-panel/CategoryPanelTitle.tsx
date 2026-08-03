import { cn } from "@internal/ui-library";

import type { BaseHTMLAttributes, FC } from "react";


const CategoryPanelTitle: FC<Omit<BaseHTMLAttributes<HTMLSpanElement>, 'className'>> = ({
	children,
	...props
}) => {
	return (
		<span
			className={cn(
				"flex-1 text-sm font-semibold"
			)}
			{...props}
		>
			{children}
		</span>
	);
}

CategoryPanelTitle.displayName = 'CategoryPanelTitle';

export { CategoryPanelTitle };
