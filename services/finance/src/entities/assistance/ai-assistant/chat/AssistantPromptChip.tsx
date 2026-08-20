import { cn } from "@internal/ui-library";
import { textClass } from "@shared/pure-components/typography";

import type { FC } from "react";


interface AssistantPromptChipProps {
	prompt: string;
}

const AssistantPromptChip: FC<AssistantPromptChipProps> = ({ prompt }) => (
	<button
		type="button"
		className={cn(
			textClass({ size: '11', weight: 'semibold', tone: 'muted' }),
			"rounded-full border border-border-strong px-2.5 py-1 hover:border-primary hover:text-primary"
		)}
	>
		{prompt}
	</button>
);

AssistantPromptChip.displayName = 'AssistantPromptChip';

export { AssistantPromptChip };
export type { AssistantPromptChipProps };
