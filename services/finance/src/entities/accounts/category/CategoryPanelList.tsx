import { cn } from "@internal/ui-library";

import type { BaseHTMLAttributes, FC } from "react";


const CategoryPanelList: FC<Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>> = ({
	children,
	...props
}) => {
	return (
		<div
			className={cn(
				"h-[270px] overflow-y-auto"
			)}
			{...props}
		>
			{children}
		</div>
	);
}

CategoryPanelList.displayName = 'CategoryPanelList';

export { CategoryPanelList };
