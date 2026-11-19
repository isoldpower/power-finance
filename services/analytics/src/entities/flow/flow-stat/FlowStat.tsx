import { FlowStatLabel } from "./stat/FlowStatLabel.tsx";
import { FlowStatValue } from "./stat/FlowStatValue.tsx";

import type { FC, PropsWithChildren } from "react";
import type { FlowStatLabelProps } from "./stat/FlowStatLabel.tsx";
import type { FlowStatValueProps } from "./stat/FlowStatValue.tsx";


type FlowStatProps = PropsWithChildren;
type FlowStatObject = FC<FlowStatProps> & {
	Label: FC<FlowStatLabelProps>;
	Value: FC<FlowStatValueProps>;
};

const FlowStat: FlowStatObject = ({ children }) => (
	<div className="flex min-w-0 flex-col gap-1">
		{children}
	</div>
);

FlowStat.Label = FlowStatLabel;
FlowStat.Value = FlowStatValue;
FlowStat.displayName = 'FlowStat';

export { FlowStat };
export type { FlowStatProps };
