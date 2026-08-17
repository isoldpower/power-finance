import { cn } from "@internal/ui-library";
import { BodyText } from "@shared/pure-components/typography";
import { AssistantChatRefs } from "./AssistantChatRefs.tsx";

import type { FC } from "react";
import type { ResourceRef } from "../../types.ts";


interface AssistantAiChatBubbleProps {
	text: string;
	refs?: ResourceRef[];
}

const AssistantAiChatBubble: FC<AssistantAiChatBubbleProps> = ({ text, refs }) => (
	<div className="flex justify-start">
		<div
			className={cn(
				"max-w-[85%] rounded-[var(--radius-md)] px-3 py-2",
				"border border-border bg-secondary text-foreground"
			)}
		>
			<BodyText as="div" size="12.5" tone="default" leading="relaxed">
				{text}
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
