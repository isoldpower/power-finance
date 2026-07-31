import type { BaseHTMLAttributes, FC } from "react";


const ActivityFeedHeaderTitle: FC<Omit<BaseHTMLAttributes<HTMLSpanElement>, 'className'>> = ({
	children,
	...props
}) => {
	return (
		<span className="text-sm font-semibold" {...props}>
			{children}
		</span>
	);
}

export { ActivityFeedHeaderTitle };