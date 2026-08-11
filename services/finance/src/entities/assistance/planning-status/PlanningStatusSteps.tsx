
import type { BaseHTMLAttributes, FC } from "react";
import { Overline } from "@shared/pure-components/typography";


const PlanningStatusSteps: FC<Omit<BaseHTMLAttributes<HTMLSpanElement>, 'className'>> = ({
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
