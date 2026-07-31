import type { FC, BaseHTMLAttributes } from "react";


const QuickAddTitle: FC<Omit<BaseHTMLAttributes<HTMLSpanElement>, 'className'>> = ({
	children,
	...props
}) => (
	<span className="flex-1 text-sm font-semibold" {...props}>
		{children}
	</span>
);

export { QuickAddTitle };