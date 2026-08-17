import { cn } from "@internal/ui-library";
import { BodyText } from "@shared/pure-components/typography";
import { AssistantChatRefs } from "./AssistantChatRefs.tsx";

import type { FC } from "react";
import type { ResourceRef } from "../../types.ts";


interface AssistantUserChatBubbleProps {
	text: string;
	refs?: ResourceRef[];
}

const AssistantUserChatBubble: FC<AssistantUserChatBubbleProps> = ({ text, refs }) => (
	<div className="flex justify-end">
		<div
			className={cn(
				"max-w-[85%] rounded-[var(--radius-md)] px-3 py-2",
				"bg-[image:var(--accent-grad)] text-white"
			)}
		>
			<BodyText as="div" size="12.5" tone="default" leading="relaxed">
				{text}
			</BodyText>
			{refs && refs.length > 0 ? (
				<AssistantChatRefs refs={refs} chipClassName="border-white/30 text-white" />
			) : null}
		</div>
	</div>
);

AssistantUserChatBubble.displayName = 'AssistantUserChatBubble';

export { AssistantUserChatBubble };
export type { AssistantUserChatBubbleProps };
