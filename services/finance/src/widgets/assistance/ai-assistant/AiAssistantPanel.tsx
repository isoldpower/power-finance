import type { FC } from "react";
import { cn } from "@internal/ui-library";

import {
	AssistantPanelHeader,
	AssistantSignalTile,
	AssistantChatBubble,
	AssistantPromptChip,
	AssistantChatInput,
	AssistantComingSoonOverlay,
} from "@entity/assistance";
import type { AssistantSignal, AssistantMessage } from "@entity/assistance";

interface AiAssistantPanelProps {
	signals: AssistantSignal[];
	chat: AssistantMessage[];
	prompts: string[];
	onClose?: () => void;
	className?: string;
	comingSoon?: boolean;
}

const AiAssistantPanel: FC<AiAssistantPanelProps> = ({ signals, chat, prompts, onClose, className, comingSoon = false }) => {
	return (
		<div className={cn("relative flex flex-col overflow-hidden rounded-[var(--radius-lg)] border border-border bg-card shadow-[var(--shadow-lg)]", className)}>
			{comingSoon ? <AssistantComingSoonOverlay /> : null}
			<div aria-hidden={comingSoon} className={cn("flex flex-1 flex-col", comingSoon && "pointer-events-none select-none")}>
			<AssistantPanelHeader onClose={onClose} />

			<div className="border-b border-border bg-secondary px-3.5 py-2.5">
				<div className="mb-2 font-numeric text-[9.5px] tracking-[0.1em] text-text-3">SIGNALS</div>
				<div className="grid grid-cols-2 gap-2">
					{signals.map((signal) => (
						<AssistantSignalTile key={signal.label} label={signal.label} value={signal.value} tone={signal.tone} />
					))}
				</div>
			</div>

			<div className="flex max-h-[340px] flex-col gap-3 overflow-y-auto p-3.5">
				{chat.map((message) => (
					<AssistantChatBubble key={message.id} role={message.role} text={message.text} refs={message.refs} />
				))}
			</div>

			<div className="mt-auto border-t border-border px-3.5 py-2.5">
				<div className="mb-2.5 flex flex-wrap gap-1.5">
					{prompts.map((prompt) => (
						<AssistantPromptChip key={prompt} prompt={prompt} />
					))}
				</div>
				<AssistantChatInput />
			</div>
			</div>
		</div>
	);
};

AiAssistantPanel.displayName = 'AiAssistantPanel';

export { AiAssistantPanel };
export type { AiAssistantPanelProps };
