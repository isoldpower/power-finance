import type { BaseHTMLAttributes, FC } from "react";
import {cn} from "@internal/ui-library";


interface MetricCardIntextProps extends Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'> {
	tone?: 'positive' | 'negative';
}

const MetricCardIntext: FC<MetricCardIntextProps> = ({
	children,
	tone = 'positive',
	...props
}) => (
	<span className={cn(
		"text-[13px] text-text-2",
		tone === 'positive' ? "text-pos" : "text-neg"
	)} {...props}>
		{children}
	</span>
);

export {MetricCardIntext };