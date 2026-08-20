import { cn } from "@internal/ui-library";

import type { BaseHTMLAttributes, FC, PropsWithChildren } from "react";


type WhatIfExampleProps = PropsWithChildren<Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>>;

const WhatIfExample: FC<WhatIfExampleProps> = ({
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
export type { WhatIfExampleProps };
