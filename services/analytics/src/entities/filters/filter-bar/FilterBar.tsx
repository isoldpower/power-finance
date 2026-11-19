import type { FC, PropsWithChildren } from "react";


type FilterBarProps = PropsWithChildren;

const FilterBar: FC<FilterBarProps> = ({ children }) => (
	<div role="toolbar" aria-label="Analytics filters" className="flex flex-wrap items-center gap-2">
		{children}
	</div>
);

FilterBar.displayName = 'FilterBar';

export { FilterBar };
export type { FilterBarProps };
