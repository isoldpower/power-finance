import { cn, FinanceCard } from "@internal/ui-library";

import { AssistantPanel } from "@entity/assistance";
import { ShowOn } from "@shared/visibility";

import type { FC } from "react";
import type { AssistantMessage, AssistantSignal } from "@entity/assistance";


interface AiAssistantPanelProps {
	signals: AssistantSignal[];
	chat: AssistantMessage[];
	prompts: string[];
	onClose?: () => void;
	className?: string;
	comingSoon?: boolean;
}

const AiAssistantPanel: FC<AiAssistantPanelProps> = ({
	signals,
	chat,
	prompts,
	onClose,
	className,
	comingSoon = false,
}) => {
	return (
		<FinanceCard 
			variant="elevated" 
			className={cn("relative flex flex-col overflow-hidden", className)}
		>
			<ShowOn condition={comingSoon}>
				<AssistantPanel.ComingSoon />
			</ShowOn>
			<AssistantPanel.Body muted={comingSoon}>
				<AssistantPanel.Header onClose={onClose} />
				<AssistantPanel.Signals>
					<AssistantPanel.SectionLabel>
						SIGNALS
					</AssistantPanel.SectionLabel>
					<AssistantPanel.SignalsGrid>
						{signals.map((signal) => (
							<AssistantPanel.SignalTile
								key={signal.label}
								label={signal.label}
								value={signal.value}
								tone={signal.tone}
							/>
						))}
					</AssistantPanel.SignalsGrid>
				</AssistantPanel.Signals>
				<AssistantPanel.Chat>
					{chat.map((message) => (
						<AssistantPanel.Bubble
							key={message.id}
							role={message.role}
							text={message.text}
							refs={message.refs}
						/>
					))}
				</AssistantPanel.Chat>
				<AssistantPanel.Composer>
					<AssistantPanel.Prompts>
						{prompts.map((prompt) => (
							<AssistantPanel.PromptChip key={prompt} prompt={prompt} />
						))}
					</AssistantPanel.Prompts>
					<AssistantPanel.Input />
				</AssistantPanel.Composer>
			</AssistantPanel.Body>
		</FinanceCard>
	);
};

AiAssistantPanel.displayName = 'AiAssistantPanel';

export { AiAssistantPanel };
export type { AiAssistantPanelProps };
