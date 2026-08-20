import { useAccountsBrowser } from "@feature/accounts";

import type { FC, ReactNode } from "react";
import type { AccountCategoryView } from "@entity/accounts";


interface BrowseAccountCategoriesProps {
	children: (category: AccountCategoryView) => ReactNode;
}

const BrowseAccountCategories: FC<BrowseAccountCategoriesProps> = ({ children }) => {
	const { categories } = useAccountsBrowser();

	return (
		<div className="px-[18px] pb-3.5 pt-2">
			{categories.map((entry) => children(entry))}
		</div>
	);
};

export { BrowseAccountCategories };
export type { BrowseAccountCategoriesProps };
