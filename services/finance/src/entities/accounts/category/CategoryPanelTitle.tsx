
import type { BaseHTMLAttributes, FC } from "react";
import { CardTitle } from "@shared/pure-components/typography";


const CategoryPanelTitle: FC<Omit<BaseHTMLAttributes<HTMLSpanElement>, 'className'>> = ({
	children,
	...props
}) => {
	return (
		<CardTitle
						className="flex-1"
			{...props}
		>
			{children}
		</CardTitle>
	);
}

CategoryPanelTitle.displayName = 'CategoryPanelTitle';

export { CategoryPanelTitle };
