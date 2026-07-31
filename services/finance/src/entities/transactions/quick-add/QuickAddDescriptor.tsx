import type { FC, BaseHTMLAttributes } from "react";


const QuickAddDescriptor: FC<Omit<BaseHTMLAttributes<HTMLSpanElement>, 'className'>> = ({
	children,
	...props
}) => (
	<span className="font-numeric text-[10px] text-text-3" {...props}>
		{children}
	</span>
);

export { QuickAddDescriptor };