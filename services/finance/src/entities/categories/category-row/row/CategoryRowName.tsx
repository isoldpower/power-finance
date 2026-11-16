import { RowTitle } from "@internal/shared";

import type { FC, ReactNode } from "react";


interface CategoryRowNameProps {
	children: ReactNode;
}

const CategoryRowName: FC<CategoryRowNameProps> = ({ children }) => (
	<RowTitle as="span" size="13.5" className="min-w-0 truncate">
		{children}
	</RowTitle>
);

CategoryRowName.displayName = 'CategoryRowName';

export { CategoryRowName };
export type { CategoryRowNameProps };
