import { cn } from "@internal/ui-library";

import type { BaseHTMLAttributes, FC } from "react";


const WhatIfTitle: FC<Omit<BaseHTMLAttributes<HTMLSpanElement>, 'className'>> = ({
	children,
	...props
}) => (
	<span
		className={cn(
			"text-[14.5px] font-semibold"
		)}
		{...props}
	>
		{children}
	</span>
);

WhatIfTitle.displayName = 'WhatIfTitle';

export { WhatIfTitle };
