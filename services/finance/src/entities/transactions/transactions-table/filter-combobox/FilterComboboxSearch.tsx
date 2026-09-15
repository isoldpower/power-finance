import { FinanceComboboxInput } from "@internal/ui-library";

import type { FC } from "react";


interface FilterComboboxSearchProps {
	placeholder: string;
}

const FilterComboboxSearch: FC<FilterComboboxSearchProps> = ({ placeholder }) => (
	<FinanceComboboxInput placeholder={placeholder} />
);

FilterComboboxSearch.displayName = 'FilterComboboxSearch';

export { FilterComboboxSearch };
export type { FilterComboboxSearchProps };
