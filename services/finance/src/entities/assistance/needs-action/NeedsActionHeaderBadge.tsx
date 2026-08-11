import type { BaseHTMLAttributes, FC } from "react";
import { cn } from "@internal/ui-library";

import { Text } from "@shared/pure-components/typography";


const NeedsActionHeaderBadge: FC<Omit<BaseHTMLAttributes<HTMLSpanElement>, 'className'>> = ({ 
	children,
	...props
}) => (
	<Text
		size="11.5"
		weight="semibold"
		tone="inverted"
		className={cn(
			"inline-flex items-center rounded-full bg-primary px-2.5 py-0.5"
		)}
		{...props}
	>
		{children}
	</Text>
);

NeedsActionHeaderBadge.displayName = 'NeedsActionHeaderBadge';

export { NeedsActionHeaderBadge };
