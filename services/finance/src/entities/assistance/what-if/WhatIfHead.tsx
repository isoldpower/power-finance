import { cn } from "@internal/ui-library";

import type { BaseHTMLAttributes, FC } from "react";


const WhatIfHead: FC<Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>> = ({
	children,
	...props
}) => (
	<div
		className={cn(
			"mb-2.5 flex items-center gap-2.5"
		)}
		{...props}
	>
		{children}
	</div>
);

WhatIfHead.displayName = 'WhatIfHead';

export { WhatIfHead };
