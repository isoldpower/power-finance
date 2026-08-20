import { cn } from "@internal/ui-library";

import type { BaseHTMLAttributes, FC, PropsWithChildren } from "react";


type WhatIfHeadProps = PropsWithChildren<Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>>;

const WhatIfHead: FC<WhatIfHeadProps> = ({
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
export type { WhatIfHeadProps };
