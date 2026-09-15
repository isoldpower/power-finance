import { FinanceComboboxContent } from "@internal/ui-library";

import type { FC, PropsWithChildren } from "react";


type FilterComboboxOptionsProps = PropsWithChildren;

const FilterComboboxOptions: FC<FilterComboboxOptionsProps> = ({ children }) => (
	<FinanceComboboxContent align="start" className="min-w-52">
		{children}
	</FinanceComboboxContent>
);

FilterComboboxOptions.displayName = 'FilterComboboxOptions';

export { FilterComboboxOptions };
export type { FilterComboboxOptionsProps };
