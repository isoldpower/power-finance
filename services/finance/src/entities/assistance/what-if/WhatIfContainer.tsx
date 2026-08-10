import { cn } from "@internal/ui-library";

import type { BaseHTMLAttributes, FC } from "react";


const WhatIfContainer: FC<Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>> = ({
	children,
	...props
}) => (
	<div
		className={cn(
			"relative overflow-hidden rounded-[var(--radius-lg)] px-5 py-[18px]",
			"border border-dashed border-[var(--accent-border)] bg-[var(--accent-soft)]"
		)}
		{...props}
	>
		{children}
	</div>
);

WhatIfContainer.displayName = 'WhatIfContainer';

export { WhatIfContainer };
