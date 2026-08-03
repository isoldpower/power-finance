import type { BaseHTMLAttributes, FC } from "react";


const NoActivityPlaceholderConverted: FC<Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>> = ({
	children,
	...props
}) => {
	return (
		<div className="text-[11px] text-text-3" {...props}>
			{children}
		</div>
	);
}

export { NoActivityPlaceholderConverted };