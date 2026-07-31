import type { BaseHTMLAttributes, FC } from "react";


const MetricCardTitle: FC<Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>> = ({ 
	children,
	...props
}) => {
	return (
		<h4 className="font-numeric text-[11px] uppercase tracking-[0.14em] text-text-3" {...props}>
			{children}
		</h4>
	);
}

export { MetricCardTitle };