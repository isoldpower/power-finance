import type { FC, ReactNode } from "react";


interface DrillPanelStatsProps {
	children: ReactNode;
}

const DrillPanelStats: FC<DrillPanelStatsProps> = ({ children }) => (
	<div className="grid grid-cols-3 gap-3 border-b border-border px-6 py-4">
		{children}
	</div>
);

DrillPanelStats.displayName = 'DrillPanelStats';

export { DrillPanelStats };
export type { DrillPanelStatsProps };
