import { CardTitle } from "@internal/shared";

import type { BaseHTMLAttributes, FC, PropsWithChildren } from "react";


type CategoryPanelTitleProps = PropsWithChildren<Omit<BaseHTMLAttributes<HTMLSpanElement>, 'className'>>;

const CategoryPanelTitle: FC<CategoryPanelTitleProps> = ({
	children,
	...props
}) => (
	<CardTitle className="flex-1" {...props}>
		{children}
	</CardTitle>
);

CategoryPanelTitle.displayName = 'CategoryPanelTitle';

export { CategoryPanelTitle };
export type { CategoryPanelTitleProps };
