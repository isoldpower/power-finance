import { AssistantChat, AssistantPanel, AssistantSignals } from "@entity/assistance";
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
		<div className={className}>
			<AssistantPanel>
				<ShowOn condition={comingSoon}>
					<AssistantPanel.ComingSoon />
				</ShowOn>
				<AssistantPanel.Body muted={comingSoon}>
					<AssistantPanel.Header onClose={onClose} />
					<AssistantSignals>
						<AssistantSignals.Label>
							SIGNALS
						</AssistantSignals.Label>
						<AssistantSignals.Grid>
							{signals.map((signal) => (
								<AssistantSignals.Tile
									key={signal.label}
									label={signal.label}
									value={signal.value}
									tone={signal.tone}
								/>
							))}
						</AssistantSignals.Grid>
					</AssistantSignals>
					<AssistantChat>
						{chat.map((message) => (
							message.role === 'user' ? (
								<AssistantChat.UserBubble
									key={message.id}
									text={message.text}
									refs={message.refs}
								/>
							) : (
								<AssistantChat.AiBubble
									key={message.id}
									text={message.text}
									refs={message.refs}
								/>
							)
						))}
					</AssistantChat>
					<AssistantChat.Composer>
						<AssistantChat.Prompts>
							{prompts.map((prompt) => (
								<AssistantChat.PromptChip key={prompt} prompt={prompt} />
							))}
						</AssistantChat.Prompts>
						<AssistantChat.Input />
					</AssistantChat.Composer>
				</AssistantPanel.Body>
			</AssistantPanel>
		</div>
	);
};

AiAssistantPanel.displayName = 'AiAssistantPanel';

export { AiAssistantPanel };
export type { AiAssistantPanelProps };
