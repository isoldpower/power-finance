import type { BaseHTMLAttributes, FC } from "react";


const MetricCardDescriptor: FC<Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>> = ({
	children,
	...props
}) => (
	<div className="mt-2 text-[13px] text-text-3" {...props}>
		{children}
	</div>
);

export { MetricCardDescriptor };