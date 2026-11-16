import type { FC, PropsWithChildren } from "react";


type InsightGridProps = PropsWithChildren;

const InsightGrid: FC<InsightGridProps> = ({ children }) => (
	<div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
		{children}
	</div>
);

InsightGrid.displayName = 'InsightGrid';

export { InsightGrid };
export type { InsightGridProps };
