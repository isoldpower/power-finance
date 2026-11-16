import { cn } from "@internal/ui-library";
import { Overline } from "@internal/shared";

import type { FC, ReactNode } from "react";


type FlowStatTone = 'positive' | 'negative' | 'neutral';

interface FlowStatLabelProps {
	tone: FlowStatTone;
	children: ReactNode;
}

const TONE_DOT: Record<FlowStatTone, string> = {
	positive: 'bg-pos',
	negative: 'bg-neg',
	neutral: 'bg-primary',
};

const FlowStatLabel: FC<FlowStatLabelProps> = ({ tone, children }) => (
	<span className="flex items-center gap-1.5">
		<span className={cn("size-1.5 rounded-full", TONE_DOT[tone])} />
		<Overline as="span" size="10" tracking="0.1em">
			{children}
		</Overline>
	</span>
);

FlowStatLabel.displayName = 'FlowStatLabel';

export { FlowStatLabel };
export type { FlowStatLabelProps, FlowStatTone };
