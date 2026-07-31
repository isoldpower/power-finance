import type { BaseHTMLAttributes, FC } from "react";


const BalanceIcon: FC<Omit<BaseHTMLAttributes<HTMLSpanElement>, 'className'>> = ({
	children,
	...props
}) => {
	return (
		<span className="pb-0.5 text-[15px] font-medium text-text-2" {...props}>
			{children}
		</span>
	);
}

export { BalanceIcon };