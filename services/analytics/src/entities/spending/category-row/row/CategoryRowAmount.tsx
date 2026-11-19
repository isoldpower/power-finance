import { Text } from "@internal/shared";

import type { FC, ReactNode } from "react";


interface CategoryRowAmountProps {
	children: ReactNode;
}

const CategoryRowAmount: FC<CategoryRowAmountProps> = ({ children }) => (
	<Text size="13" weight="semibold" family="numeric" className="text-right">
		{children}
	</Text>
);

CategoryRowAmount.displayName = 'CategoryRowAmount';

export { CategoryRowAmount };
export type { CategoryRowAmountProps };
