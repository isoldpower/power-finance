import type { FC, ReactNode } from "react";


interface DrillPanelBodyProps {
	toolbar: ReactNode;
	children: ReactNode;
}

const DrillPanelBody: FC<DrillPanelBodyProps> = ({ toolbar, children }) => (
	<div className="flex min-h-0 flex-1 flex-col">
		<div className="flex items-center justify-between gap-3 px-6 pb-2 pt-4">
			{toolbar}
		</div>
		<div className="min-h-0 flex-1 overflow-y-auto px-3.5 pb-6">
			{children}
		</div>
	</div>
);

DrillPanelBody.displayName = 'DrillPanelBody';

export { DrillPanelBody };
export type { DrillPanelBodyProps };
