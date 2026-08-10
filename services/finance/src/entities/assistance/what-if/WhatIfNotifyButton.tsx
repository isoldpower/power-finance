import { cn } from "@internal/ui-library";

import type { ButtonHTMLAttributes, FC } from "react";


const WhatIfNotifyButton: FC<Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'type'>> = ({
	children,
	...props
}) => (
	<button
		type="button"
		className={cn(
			"mt-3.5 inline-flex cursor-not-allowed items-center gap-1.5 rounded-[var(--radius-md)]",
			"border border-border-strong bg-card px-3.5 py-2 text-[12.5px] font-semibold text-text-3"
		)}
		{...props}
	>
		{children}
	</button>
);

WhatIfNotifyButton.displayName = 'WhatIfNotifyButton';

export { WhatIfNotifyButton };
