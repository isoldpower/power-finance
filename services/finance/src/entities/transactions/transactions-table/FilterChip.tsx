import { FinanceMenu } from "@internal/ui-library";
import { FilterChipCaret } from "./filter-chip/FilterChipCaret.tsx";
import { FilterChipOption } from "./filter-chip/FilterChipOption.tsx";
import { FilterChipOptions } from "./filter-chip/FilterChipOptions.tsx";
import { FilterChipTrigger } from "./filter-chip/FilterChipTrigger.tsx";

import type { FC, PropsWithChildren } from "react";
import type { FilterChipOptionProps } from "./filter-chip/FilterChipOption.tsx";
import type { FilterChipOptionsProps } from "./filter-chip/FilterChipOptions.tsx";
import type { FilterChipTriggerProps } from "./filter-chip/FilterChipTrigger.tsx";


type FilterChipProps = PropsWithChildren;
type FilterChipObject = FC<FilterChipProps> & {
	Caret: FC;
	Option: FC<FilterChipOptionProps>;
	Options: FC<FilterChipOptionsProps>;
	Trigger: FC<FilterChipTriggerProps>;
}

const FilterChip: FilterChipObject = ({ children }) => (
	<FinanceMenu>
		{children}
	</FinanceMenu>
);

FilterChip.Caret = FilterChipCaret;
FilterChip.Option = FilterChipOption;
FilterChip.Options = FilterChipOptions;
FilterChip.Trigger = FilterChipTrigger;
FilterChip.displayName = 'FilterChip';

export { FilterChip };
export type { FilterChipProps };
