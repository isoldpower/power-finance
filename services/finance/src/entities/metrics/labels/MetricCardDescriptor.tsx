import { Caption } from "@shared/pure-components/typography";

import type { BaseHTMLAttributes, FC, PropsWithChildren } from "react";


type MetricCardDescriptorProps = PropsWithChildren<Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>>;

const MetricCardDescriptor: FC<MetricCardDescriptorProps> = ({
	children,
	...props
}) => (
	<Caption size="13" className="mt-2" {...props}>
		{children}
	</Caption>
);

MetricCardDescriptor.displayName = 'MetricCardDescriptor';

export { MetricCardDescriptor };
export type { MetricCardDescriptorProps };
