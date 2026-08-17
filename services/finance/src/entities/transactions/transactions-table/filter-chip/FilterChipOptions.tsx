import { FinanceMenuContent } from "@internal/ui-library";

import type { FC, PropsWithChildren } from "react";


type FilterChipOptionsProps = PropsWithChildren;

const FilterChipOptions: FC<FilterChipOptionsProps> = ({ children }) => (
	<FinanceMenuContent align="start" className="min-w-44">
		{children}
	</FinanceMenuContent>
);

FilterChipOptions.displayName = 'FilterChipOptions';

export { FilterChipOptions };
export type { FilterChipOptionsProps };
