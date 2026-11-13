import { FinanceComboboxContent } from "@internal/ui-library";

import { FILTER_OPTIONS_COLLISION_PADDING } from "../filter-control.ts";

import type { FC, PropsWithChildren } from "react";


type FilterComboboxOptionsProps = PropsWithChildren;

const FilterComboboxOptions: FC<FilterComboboxOptionsProps> = ({ children }) => (
	<FinanceComboboxContent
		align="start"
		collisionPadding={FILTER_OPTIONS_COLLISION_PADDING}
		className="min-w-52"
	>
		{children}
	</FinanceComboboxContent>
);

FilterComboboxOptions.displayName = 'FilterComboboxOptions';

export { FilterComboboxOptions };
export type { FilterComboboxOptionsProps };
