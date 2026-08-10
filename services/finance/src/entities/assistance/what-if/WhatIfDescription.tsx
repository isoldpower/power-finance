import { cn } from "@internal/ui-library";

import type { BaseHTMLAttributes, FC } from "react";


const WhatIfDescription: FC<Omit<BaseHTMLAttributes<HTMLParagraphElement>, 'className'>> = ({
	children,
	...props
}) => (
	<p
		className={cn(
			"max-w-[520px] text-[13px] leading-relaxed text-text-2"
		)}
		{...props}
	>
		{children}
	</p>
);

WhatIfDescription.displayName = 'WhatIfDescription';

export { WhatIfDescription };
