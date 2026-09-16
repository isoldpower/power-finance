import { cn } from "@internal/ui-library";
import { AssistantAiChatBubble } from "./chat/AssistantAiChatBubble.tsx";
import { AssistantChatError } from "./chat/AssistantChatError.tsx";
import { AssistantChatInput } from "./chat/AssistantChatInput.tsx";
import { AssistantComposer } from "./chat/AssistantComposer.tsx";
import { AssistantPromptChip } from "./chat/AssistantPromptChip.tsx";
import { AssistantPromptsRow } from "./chat/AssistantPromptsRow.tsx";
import { AssistantQuotaNote } from "./chat/AssistantQuotaNote.tsx";
import { AssistantTypingBubble } from "./chat/AssistantTypingBubble.tsx";
import { AssistantUserChatBubble } from "./chat/AssistantUserChatBubble.tsx";

import type { BaseHTMLAttributes, FC, PropsWithChildren, Ref } from "react";
import type { AssistantAiChatBubbleProps } from "./chat/AssistantAiChatBubble.tsx";
import type { AssistantChatErrorProps } from "./chat/AssistantChatError.tsx";
import type { AssistantChatInputProps } from "./chat/AssistantChatInput.tsx";
import type { AssistantComposerProps } from "./chat/AssistantComposer.tsx";
import type { AssistantPromptChipProps } from "./chat/AssistantPromptChip.tsx";
import type { AssistantPromptsRowProps } from "./chat/AssistantPromptsRow.tsx";
import type { AssistantQuotaNoteProps } from "./chat/AssistantQuotaNote.tsx";
import type { AssistantUserChatBubbleProps } from "./chat/AssistantUserChatBubble.tsx";


type AssistantChatProps = PropsWithChildren<Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'> & {
	ref?: Ref<HTMLDivElement>;
}>;
type AssistantChatObject = FC<AssistantChatProps> & {
	AiBubble: FC<AssistantAiChatBubbleProps>;
	Composer: FC<AssistantComposerProps>;
	Error: FC<AssistantChatErrorProps>;
	Input: FC<AssistantChatInputProps>;
	PromptChip: FC<AssistantPromptChipProps>;
	Prompts: FC<AssistantPromptsRowProps>;
	Quota: FC<AssistantQuotaNoteProps>;
	Typing: FC;
	UserBubble: FC<AssistantUserChatBubbleProps>;
}

const AssistantChat: AssistantChatObject = ({
	children,
	...props
}) => (
	<div
		className={cn(
			"flex max-h-[420px] flex-col gap-3 overflow-y-auto p-3.5"
		)}
		{...props}
	>
		{children}
	</div>
);

AssistantChat.AiBubble = AssistantAiChatBubble;
AssistantChat.Composer = AssistantComposer;
AssistantChat.Error = AssistantChatError;
AssistantChat.Input = AssistantChatInput;
AssistantChat.PromptChip = AssistantPromptChip;
AssistantChat.Prompts = AssistantPromptsRow;
AssistantChat.Quota = AssistantQuotaNote;
AssistantChat.Typing = AssistantTypingBubble;
AssistantChat.UserBubble = AssistantUserChatBubble;
AssistantChat.displayName = 'AssistantChat';

export { AssistantChat };
export type { AssistantChatProps };
