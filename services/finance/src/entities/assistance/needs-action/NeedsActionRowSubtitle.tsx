import type { BaseHTMLAttributes, FC } from "react";
import { Text } from "@shared/pure-components/typography";


const NeedsActionRowSubtitle: FC<Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>> = ({ 
	children,
	...props
}) => (
	<Text
			as="p"
			size="xs"
			tone="muted"
			className="mt-px"
			{...props}
		>
		{children}
	</Text>
);

NeedsActionRowSubtitle.displayName = 'NeedsActionRowSubtitle';

export { NeedsActionRowSubtitle };