import { cn } from "@internal/ui-library";

import type { FC } from "react";


const DOT_DELAYS = ['[animation-delay:0ms]', '[animation-delay:150ms]', '[animation-delay:300ms]'];

const AssistantTypingBubble: FC = () => (
	<div className="flex justify-start">
		<div
			className={cn(
				"flex items-center gap-1 rounded-[var(--radius-md)] px-3 py-3",
				"border border-border bg-secondary"
			)}
			role="status"
			aria-label="Assistant is thinking"
		>
			{DOT_DELAYS.map((delay) => (
				<span
					key={delay}
					className={cn("size-1.5 animate-pulse rounded-full bg-[var(--text-3)]", delay)}
				/>
			))}
		</div>
	</div>
);

AssistantTypingBubble.displayName = 'AssistantTypingBubble';

export { AssistantTypingBubble };
