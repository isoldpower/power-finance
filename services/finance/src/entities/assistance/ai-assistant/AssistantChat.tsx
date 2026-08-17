import { cn } from "@internal/ui-library";
import { AssistantAiChatBubble } from "./chat/AssistantAiChatBubble.tsx";
import { AssistantChatInput } from "./chat/AssistantChatInput.tsx";
import { AssistantComposer } from "./chat/AssistantComposer.tsx";
import { AssistantPromptChip } from "./chat/AssistantPromptChip.tsx";
import { AssistantPromptsRow } from "./chat/AssistantPromptsRow.tsx";
import { AssistantUserChatBubble } from "./chat/AssistantUserChatBubble.tsx";

import type { BaseHTMLAttributes, FC, PropsWithChildren } from "react";
import type { AssistantAiChatBubbleProps } from "./chat/AssistantAiChatBubble.tsx";
import type { AssistantComposerProps } from "./chat/AssistantComposer.tsx";
import type { AssistantPromptChipProps } from "./chat/AssistantPromptChip.tsx";
import type { AssistantPromptsRowProps } from "./chat/AssistantPromptsRow.tsx";
import type { AssistantUserChatBubbleProps } from "./chat/AssistantUserChatBubble.tsx";


type AssistantChatProps = PropsWithChildren<Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>>;
type AssistantChatObject = FC<AssistantChatProps> & {
	AiBubble: FC<AssistantAiChatBubbleProps>;
	Composer: FC<AssistantComposerProps>;
	Input: FC;
	PromptChip: FC<AssistantPromptChipProps>;
	Prompts: FC<AssistantPromptsRowProps>;
	UserBubble: FC<AssistantUserChatBubbleProps>;
}

const AssistantChat: AssistantChatObject = ({
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

AssistantChat.AiBubble = AssistantAiChatBubble;
AssistantChat.Composer = AssistantComposer;
AssistantChat.Input = AssistantChatInput;
AssistantChat.PromptChip = AssistantPromptChip;
AssistantChat.Prompts = AssistantPromptsRow;
AssistantChat.UserBubble = AssistantUserChatBubble;
AssistantChat.displayName = 'AssistantChat';

export { AssistantChat };
export type { AssistantChatProps };
