import { cn } from "@internal/ui-library";

import type { BaseHTMLAttributes, FC } from "react";


const WhatIfHighlight: FC<Omit<BaseHTMLAttributes<HTMLElement>, 'className'>> = ({
	children,
	...props
}) => (
	<b
		className={cn(
			"text-pos"
		)}
		{...props}
	>
		{children}
	</b>
);

WhatIfHighlight.displayName = 'WhatIfHighlight';

export { WhatIfHighlight };
