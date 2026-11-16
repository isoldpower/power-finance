import { CategoryCatalog } from "./catalog/CategoryCatalog.tsx";

import type { FC } from "react";


const CategoriesSettings: FC = () => (
	<>
		<CategoryCatalog kind="transaction" />
		<CategoryCatalog kind="wallet" />
	</>
);

CategoriesSettings.displayName = 'CategoriesSettings';

export { CategoriesSettings };
