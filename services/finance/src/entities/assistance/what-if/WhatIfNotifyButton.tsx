import { cn } from "@internal/ui-library";

import type { ButtonHTMLAttributes, FC } from "react";
import { textClass } from "@shared/pure-components/typography";


const WhatIfNotifyButton: FC<Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'type'>> = ({
	children,
	...props
}) => (
	<button
		type="button"
		className={cn(
			"mt-3.5 inline-flex cursor-not-allowed items-center gap-1.5 rounded-[var(--radius-md)]",
			textClass({ size: '12.5', weight: 'semibold', tone: 'subtle' }), "border border-border-strong bg-card px-3.5 py-2"
		)}
		{...props}
	>
		{children}
	</button>
);

WhatIfNotifyButton.displayName = 'WhatIfNotifyButton';

export { WhatIfNotifyButton };
