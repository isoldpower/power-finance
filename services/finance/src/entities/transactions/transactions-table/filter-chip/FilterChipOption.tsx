import { FinanceMenuItem } from "@internal/ui-library";

import type { FC, PropsWithChildren } from "react";


type FilterChipOptionProps = PropsWithChildren<{
	onSelect: () => void;
}>;

const FilterChipOption: FC<FilterChipOptionProps> = ({ children, onSelect }) => (
	<FinanceMenuItem onClick={onSelect}>
		{children}
	</FinanceMenuItem>
);

FilterChipOption.displayName = 'FilterChipOption';

export { FilterChipOption };
export type { FilterChipOptionProps };
