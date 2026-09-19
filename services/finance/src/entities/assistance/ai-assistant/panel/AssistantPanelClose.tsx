import { cn } from "@internal/ui-library";

import type { ButtonHTMLAttributes, FC } from "react";


type AssistantPanelCloseProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children' | 'type'>;

const AssistantPanelClose: FC<AssistantPanelCloseProps> = (props) => (
	<button
		type="button"
		className={cn(
			"flex size-7 flex-none items-center justify-center rounded-[var(--radius-md)]",
			"border border-border-strong text-text-2 hover:bg-secondary lg:hidden"
		)}
		{...props}
	>
		✕
	</button>
);

AssistantPanelClose.displayName = 'AssistantPanelClose';

export { AssistantPanelClose };
export type { AssistantPanelCloseProps };
