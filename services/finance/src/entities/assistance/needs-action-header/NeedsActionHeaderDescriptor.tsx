import type { BaseHTMLAttributes, FC } from "react";


const NeedsActionHeaderDescriptor: FC<Omit<BaseHTMLAttributes<HTMLSpanElement>, 'className'>> = ({ 
	children,
	...props
}) => (
	<span className="hidden font-numeric text-[11px] text-text-3 sm:block" {...props}>
		{children}
	</span>
);

NeedsActionHeaderDescriptor.displayName = 'NeedsActionHeaderDescriptor';

export { NeedsActionHeaderDescriptor };
