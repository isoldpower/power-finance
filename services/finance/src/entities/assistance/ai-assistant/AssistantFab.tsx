import { cn } from "@internal/ui-library";

import type { ButtonHTMLAttributes, FC } from "react";


const AssistantFab: FC<Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'type'>> = ({
	children,
	...props
}) => (
	<button
		type="button"
		className={cn(
			"finance-theme fixed bottom-5 right-5 z-30 flex size-14 items-center justify-center",
			"rounded-full bg-[image:var(--accent-grad)] shadow-[0_8px_24px_var(--glow)]"
		)}
		{...props}
	>
		{children}
	</button>
);

AssistantFab.displayName = 'AssistantFab';

export { AssistantFab };
