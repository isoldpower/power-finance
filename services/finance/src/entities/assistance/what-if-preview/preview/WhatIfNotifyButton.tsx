import { cn } from "@internal/ui-library";
import { textClass } from "@shared/pure-components/typography";

import type { ButtonHTMLAttributes, FC, PropsWithChildren } from "react";


type WhatIfNotifyButtonProps = PropsWithChildren<
	Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'type'>
>;

const WhatIfNotifyButton: FC<WhatIfNotifyButtonProps> = ({
	children,
	...props
}) => (
	<button
		type="button"
		className={cn(
			"mt-3.5 inline-flex cursor-not-allowed items-center gap-1.5 rounded-[var(--radius-md)]",
			textClass({ size: '12.5', weight: 'semibold', tone: 'subtle' }),
			"border border-border-strong bg-card px-3.5 py-2"
		)}
		{...props}
	>
		{children}
	</button>
);

WhatIfNotifyButton.displayName = 'WhatIfNotifyButton';

export { WhatIfNotifyButton };
export type { WhatIfNotifyButtonProps };
