import { cn } from "@internal/ui-library";

import type { BaseHTMLAttributes, FC } from "react";


const WhatIfExample: FC<Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>> = ({
	children,
	...props
}) => (
	<div
		className={cn(
			"mt-3.5 flex items-center gap-2.5 rounded-[var(--radius-md)]",
			"border border-border bg-card px-3.5 py-2.5"
		)}
		{...props}
	>
		{children}
	</div>
);

WhatIfExample.displayName = 'WhatIfExample';

export { WhatIfExample };
