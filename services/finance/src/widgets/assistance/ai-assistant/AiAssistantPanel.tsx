import { AssistantPanel, AssistantSignals } from "@entity/assistance";

import { AiAssistantChat } from "./AiAssistantChat.tsx";

import type { FC } from "react";
import type { AssistantMessage, AssistantQuota, AssistantSignal } from "@entity/assistance";


interface AiAssistantPanelProps {
	signals: AssistantSignal[];
	chat: AssistantMessage[];
	prompts: string[];
	streamed: string;
	quota: AssistantQuota | null;
	exhausted: boolean;
	isPending: boolean;
	isError: boolean;
	onSend: (text: string) => void;
	onClose?: () => void;
	className?: string;
	id?: string;
}

const AiAssistantPanel: FC<AiAssistantPanelProps> = ({
	signals,
	chat,
	prompts,
	streamed,
	quota,
	exhausted,
	isPending,
	isError,
	onSend,
	onClose,
	className,
	id,
}) => {
	return (
		<div id={id} className={className}>
			<AssistantPanel>
				<AssistantPanel.Body>
					<AssistantPanel.Header>
						<AssistantPanel.Badge />
						<AssistantPanel.Titles>
							<AssistantPanel.Title>
								AI assistant
							</AssistantPanel.Title>
							<AssistantPanel.Hint>
								grounded in your data
							</AssistantPanel.Hint>
						</AssistantPanel.Titles>
						<AssistantPanel.Status />
						{onClose ? (
							<AssistantPanel.Close onClick={onClose} />
						) : null}
					</AssistantPanel.Header>
					<AssistantSignals>
						<AssistantSignals.Label>
							SIGNALS
						</AssistantSignals.Label>
						<AssistantSignals.Row>
							{signals.map((signal) => (
								<AssistantSignals.Tile
									key={signal.label}
									label={signal.label}
									value={signal.value}
									tone={signal.tone}
								/>
							))}
						</AssistantSignals.Row>
					</AssistantSignals>
					<AiAssistantChat
						messages={chat}
						prompts={prompts}
						streamed={streamed}
						quota={quota}
						exhausted={exhausted}
						isPending={isPending}
						isError={isError}
						onSend={onSend}
					/>
				</AssistantPanel.Body>
			</AssistantPanel>
		</div>
	);
};

AiAssistantPanel.displayName = 'AiAssistantPanel';

export { AiAssistantPanel };
export type { AiAssistantPanelProps };
