import type { BaseHTMLAttributes, FC } from "react";


const NoActivityPlaceholderOriginal: FC<Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>> = ({
	children,
	...props
}) => {
	return (
		<div className="text-[13px] font-medium text-text-3 opacity-50" {...props}>
			{children}
		</div>
	);
}

export { NoActivityPlaceholderOriginal };