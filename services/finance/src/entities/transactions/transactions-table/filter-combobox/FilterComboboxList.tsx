import { FinanceComboboxEmpty, FinanceComboboxList } from "@internal/ui-library";

import type { FC, PropsWithChildren } from "react";


type FilterComboboxListProps = PropsWithChildren<{
	emptyLabel: string;
}>;

const FilterComboboxList: FC<FilterComboboxListProps> = ({ children, emptyLabel }) => (
	<FinanceComboboxList>
		<FinanceComboboxEmpty>
			{emptyLabel}
		</FinanceComboboxEmpty>
		{children}
	</FinanceComboboxList>
);

FilterComboboxList.displayName = 'FilterComboboxList';

export { FilterComboboxList };
export type { FilterComboboxListProps };
