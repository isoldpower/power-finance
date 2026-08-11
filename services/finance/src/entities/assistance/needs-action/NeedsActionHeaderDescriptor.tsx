import type { BaseHTMLAttributes, FC } from "react";
import { MetaText } from "@shared/pure-components/typography";


const NeedsActionHeaderDescriptor: FC<Omit<BaseHTMLAttributes<HTMLSpanElement>, 'className'>> = ({ 
	children,
	...props
}) => (
	<MetaText size="11" className="hidden sm:block" {...props}>
		{children}
	</MetaText>
);

NeedsActionHeaderDescriptor.displayName = 'NeedsActionHeaderDescriptor';

export { NeedsActionHeaderDescriptor };
