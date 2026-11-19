import type { FC, ReactNode } from "react";


interface ChartCardHeaderProps {
	children: ReactNode;
}

const ChartCardHeader: FC<ChartCardHeaderProps> = ({ children }) => (
	<div className="flex flex-wrap items-start justify-between gap-3">
		{children}
	</div>
);

ChartCardHeader.displayName = 'ChartCardHeader';

export { ChartCardHeader };
export type { ChartCardHeaderProps };
