import { Overline } from "@shared/pure-components/typography";

import type { BaseHTMLAttributes, FC, PropsWithChildren } from "react";


type PlanningStatusStepsProps = PropsWithChildren<Omit<BaseHTMLAttributes<HTMLSpanElement>, 'className'>>;

const PlanningStatusSteps: FC<PlanningStatusStepsProps> = ({
	children,
	...props
}) => (
	<Overline
		as="span"
		size="11"
		tracking="0.08em"
		tone="subtle"
		className="hidden sm:block"
		{...props}
	>
		{children}
	</Overline>
);

PlanningStatusSteps.displayName = 'PlanningStatusSteps';

export { PlanningStatusSteps };
export type { PlanningStatusStepsProps };
