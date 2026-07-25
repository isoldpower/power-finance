import type { FC, ReactNode } from "react";

import type { MockAccountCategory } from "@feature/accounts";
import { useAccountsBrowser } from "@feature/accounts/browse-accounts/BrowseAccountsContext.tsx";


interface BrowseAccountCategoriesProps {
	children: (category: MockAccountCategory) => ReactNode;
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
