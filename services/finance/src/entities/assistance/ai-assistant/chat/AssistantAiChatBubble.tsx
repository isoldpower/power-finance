import { cn } from "@internal/ui-library";
import { BodyText } from "@shared/pure-components/typography";
import { pendingClass } from "@shared/pure-components/feedback";
import { AssistantChatRefs } from "./AssistantChatRefs.tsx";

import type { FC } from "react";
import type { ResourceRef } from "../../types.ts";


interface AssistantAiChatBubbleProps {
	text: string;
	refs?: ResourceRef[];
	pending?: boolean;
	streaming?: boolean;
}

const AssistantAiChatBubble: FC<AssistantAiChatBubbleProps> = ({
	text,
	refs,
	pending,
	streaming = false,
}) => (
	<div className="flex justify-start">
		<div
			className={cn(
				"max-w-[85%] rounded-[var(--radius-md)] px-3 py-2",
				"border border-border bg-secondary text-foreground",
				pendingClass(pending)
			)}
		>
			<BodyText as="div" size="12.5" tone="default" leading="relaxed">
				{text}
				{streaming ? (
					<span className="ml-0.5 inline-block h-[1em] w-[2px] animate-pulse bg-primary align-text-bottom" />
				) : null}
			</BodyText>
			{refs && refs.length > 0 ? (
				<AssistantChatRefs
					refs={refs}
					chipClassName="border-[var(--accent-border)] bg-[var(--accent-soft)] text-primary"
				/>
			) : null}
		</div>
	</div>
);

AssistantAiChatBubble.displayName = 'AssistantAiChatBubble';

export { AssistantAiChatBubble };
export type { AssistantAiChatBubbleProps };
