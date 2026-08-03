import { cn } from "@internal/ui-library";

import type { BaseHTMLAttributes, FC } from "react";


const CategoryPanelHeader: FC<Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>> = ({
	children,
	...props
}) => {
	return (
		<div
			className={cn(
				"flex items-center gap-2.5 border-b border-border px-4 py-3"
			)}
			{...props}
		>
			{children}
		</div>
	);
}

CategoryPanelHeader.displayName = 'CategoryPanelHeader';

export { CategoryPanelHeader };
