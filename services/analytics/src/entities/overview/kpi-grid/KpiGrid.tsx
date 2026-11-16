import type { FC, PropsWithChildren } from "react";


type KpiGridProps = PropsWithChildren;

const KpiGrid: FC<KpiGridProps> = ({ children }) => (
	<div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
		{children}
	</div>
);

KpiGrid.displayName = 'KpiGrid';

export { KpiGrid };
export type { KpiGridProps };
