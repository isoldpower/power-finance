import type { BaseHTMLAttributes, FC } from "react";


const NoActivityPlaceholderContainer: FC<Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>> = ({
	children,
	...props
}) => {
	return (
		<div className="flex items-center gap-3 border-b border-border px-[18px] py-2.5" {...props}>
			{children}
		</div>
	);
}

export { NoActivityPlaceholderContainer };