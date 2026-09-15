import { FinanceComboboxItem } from "@internal/ui-library";

import type { FC, PropsWithChildren } from "react";


type FilterComboboxOptionProps = PropsWithChildren<{
	value: string;
	keywords?: string[];
	onSelect: () => void;
}>;

const FilterComboboxOption: FC<FilterComboboxOptionProps> = ({
	children,
	value,
	keywords,
	onSelect,
}) => (
	<FinanceComboboxItem value={value} keywords={keywords} onSelect={onSelect}>
		{children}
	</FinanceComboboxItem>
);

FilterComboboxOption.displayName = 'FilterComboboxOption';

export { FilterComboboxOption };
export type { FilterComboboxOptionProps };
