import type { BaseHTMLAttributes, FC } from "react";


const NeedsActionHeaderTitle: FC<Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>> = ({ 
	children,
	...props
}) => (
	<span className="text-[14.5px] font-semibold" {...props}>
		{children}
	</span>
);

NeedsActionHeaderTitle.displayName = 'NeedsActionHeaderTitle';

export { NeedsActionHeaderTitle };
