import type { BaseHTMLAttributes, FC } from "react";
import { Caption } from "@shared/pure-components/typography";


const MetricCardDescriptor: FC<Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>> = ({
	children,
	...props
}) => (
	<Caption size="13" className="mt-2" {...props}>
		{children}
	</Caption>
);

export { MetricCardDescriptor };