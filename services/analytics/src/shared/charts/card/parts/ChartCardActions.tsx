import type { FC, ReactNode } from "react";


interface ChartCardActionsProps {
	children: ReactNode;
}

const ChartCardActions: FC<ChartCardActionsProps> = ({ children }) => (
	<div className="flex flex-wrap items-center gap-2">
		{children}
	</div>
);

ChartCardActions.displayName = 'ChartCardActions';

export { ChartCardActions };
export type { ChartCardActionsProps };
