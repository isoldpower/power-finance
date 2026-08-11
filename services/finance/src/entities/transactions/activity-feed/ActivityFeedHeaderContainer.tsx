import type { BaseHTMLAttributes, FC } from "react";


const ActivityFeedHeaderContainer: FC<Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>> = ({
	children,
	...props
}) => {
	return (
		<div className="flex items-center gap-2.5 border-b border-border px-[18px] py-3.5" {...props}>
			{children}
		</div>
	);
}

export { ActivityFeedHeaderContainer };