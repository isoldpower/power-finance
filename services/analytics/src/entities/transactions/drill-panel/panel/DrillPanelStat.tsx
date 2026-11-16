import { DisplayText, Overline } from "@internal/shared";

import type { FC, ReactNode } from "react";


interface DrillPanelStatProps {
	label: string;
	tone?: 'positive' | 'negative' | 'default';
	children: ReactNode;
}

const DrillPanelStat: FC<DrillPanelStatProps> = ({ label, tone = 'default', children }) => (
	<div className="flex min-w-0 flex-col gap-1">
		<Overline as="span" size="10" tracking="0.1em">
			{label}
		</Overline>
		<DisplayText size="15" truncate tone={tone}>
			{children}
		</DisplayText>
	</div>
);

DrillPanelStat.displayName = 'DrillPanelStat';

export { DrillPanelStat };
export type { DrillPanelStatProps };
