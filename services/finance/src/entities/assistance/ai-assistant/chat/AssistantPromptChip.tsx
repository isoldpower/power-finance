import { cn } from "@internal/ui-library";
import { textClass } from "@shared/pure-components/typography";

import type { FC } from "react";


interface AssistantPromptChipProps {
	prompt: string;
	onSelect?: (prompt: string) => void;
	disabled?: boolean;
}

const AssistantPromptChip: FC<AssistantPromptChipProps> = ({ prompt, onSelect, disabled = false }) => (
	<button
		type="button"
		disabled={disabled}
		onClick={() => { onSelect?.(prompt); }}
		className={cn(
			textClass({ size: '11', weight: 'semibold', tone: 'muted' }),
			"flex-none whitespace-nowrap rounded-full border border-border-strong px-2.5 py-1",
			disabled ? "cursor-not-allowed opacity-50" : "hover:border-primary hover:text-primary"
		)}
	>
		{prompt}
	</button>
);

AssistantPromptChip.displayName = 'AssistantPromptChip';

export { AssistantPromptChip };
export type { AssistantPromptChipProps };
