import { FinanceCombobox } from "@internal/ui-library";
import { FilterComboboxList } from "./filter-combobox/FilterComboboxList.tsx";
import { FilterComboboxOption } from "./filter-combobox/FilterComboboxOption.tsx";
import { FilterComboboxOptions } from "./filter-combobox/FilterComboboxOptions.tsx";
import { FilterComboboxSearch } from "./filter-combobox/FilterComboboxSearch.tsx";
import { FilterComboboxTrigger } from "./filter-combobox/FilterComboboxTrigger.tsx";

import type { FC, PropsWithChildren } from "react";
import type { FilterComboboxListProps } from "./filter-combobox/FilterComboboxList.tsx";
import type { FilterComboboxOptionProps } from "./filter-combobox/FilterComboboxOption.tsx";
import type { FilterComboboxOptionsProps } from "./filter-combobox/FilterComboboxOptions.tsx";
import type { FilterComboboxSearchProps } from "./filter-combobox/FilterComboboxSearch.tsx";
import type { FilterComboboxTriggerProps } from "./filter-combobox/FilterComboboxTrigger.tsx";


type FilterComboboxProps = PropsWithChildren;
type FilterComboboxObject = FC<FilterComboboxProps> & {
	List: FC<FilterComboboxListProps>;
	Option: FC<FilterComboboxOptionProps>;
	Options: FC<FilterComboboxOptionsProps>;
	Search: FC<FilterComboboxSearchProps>;
	Trigger: FC<FilterComboboxTriggerProps>;
}

const FilterCombobox: FilterComboboxObject = ({ children }) => (
	<FinanceCombobox>
		{children}
	</FinanceCombobox>
);

FilterCombobox.List = FilterComboboxList;
FilterCombobox.Option = FilterComboboxOption;
FilterCombobox.Options = FilterComboboxOptions;
FilterCombobox.Search = FilterComboboxSearch;
FilterCombobox.Trigger = FilterComboboxTrigger;
FilterCombobox.displayName = 'FilterCombobox';

export { FilterCombobox };
export type { FilterComboboxProps };
