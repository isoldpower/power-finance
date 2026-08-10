import { cn } from "@internal/ui-library";

import type { BaseHTMLAttributes, FC } from "react";


const AssistantChatFeed: FC<Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>> = ({
	children,
	...props
}) => (
	<div
		className={cn(
			"flex max-h-[340px] flex-col gap-3 overflow-y-auto p-3.5"
		)}
		{...props}
	>
		{children}
	</div>
);

AssistantChatFeed.displayName = 'AssistantChatFeed';

export { AssistantChatFeed };
