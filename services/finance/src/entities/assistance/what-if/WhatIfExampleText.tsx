import { cn } from "@internal/ui-library";

import type { BaseHTMLAttributes, FC } from "react";


const WhatIfExampleText: FC<Omit<BaseHTMLAttributes<HTMLSpanElement>, 'className'>> = ({
	children,
	...props
}) => (
	<span
		className={cn(
			"text-[12.5px] text-text-2"
		)}
		{...props}
	>
		{children}
	</span>
);

WhatIfExampleText.displayName = 'WhatIfExampleText';

export { WhatIfExampleText };
