import { FinanceMenuContent } from "@internal/ui-library";

import { FILTER_OPTIONS_COLLISION_PADDING } from "../filter-control.ts";

import type { FC, PropsWithChildren } from "react";


type FilterChipOptionsProps = PropsWithChildren;

const FilterChipOptions: FC<FilterChipOptionsProps> = ({ children }) => (
	<FinanceMenuContent
		align="start"
		collisionPadding={FILTER_OPTIONS_COLLISION_PADDING}
		className="min-w-44"
	>
		{children}
	</FinanceMenuContent>
);

FilterChipOptions.displayName = 'FilterChipOptions';

export { FilterChipOptions };
export type { FilterChipOptionsProps };
