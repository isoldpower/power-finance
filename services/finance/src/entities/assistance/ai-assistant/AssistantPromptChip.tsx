import type { FC } from "react";

interface AssistantPromptChipProps {
	prompt: string;
}

const AssistantPromptChip: FC<AssistantPromptChipProps> = ({ prompt }) => (
	<button type="button" className="rounded-full border border-border-strong px-2.5 py-1 text-[11px] font-semibold text-text-2 hover:border-primary hover:text-primary">
		{prompt}
	</button>
);

AssistantPromptChip.displayName = 'AssistantPromptChip';

export { AssistantPromptChip };
export type { AssistantPromptChipProps };
