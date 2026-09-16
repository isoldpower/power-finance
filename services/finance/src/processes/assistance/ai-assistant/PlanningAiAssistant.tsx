import { useMemo } from "react";
import { AiAssistantFab, AiAssistantPanel, AiAssistantSheet } from "@widget/assistance";
import { chatHistory } from "@entity/assistance";
import { ShowOnDesktop, ShowOnMobile } from "@shared/visibility";
import { useDisclosure } from "@shared/overlays";
import { useAssistantMessages, useAssistantOverview, useSendAssistantMessage } from "@feature/assistance";

import type { FC } from "react";


const PlanningAiAssistant: FC = () => {
	const { open, onOpen, onClose } = useDisclosure();
	const { overview } = useAssistantOverview();
	const { messages } = useAssistantMessages();
	const { send, streamed, quota, exhausted, isPending, isError } = useSendAssistantMessage();

	const history = useMemo(() => chatHistory(messages), [messages]);

	return (
		<>
			<ShowOnDesktop>
				<AiAssistantPanel
					signals={overview.signals}
					prompts={overview.prompts}
					chat={history}
					streamed={streamed}
					quota={quota}
					exhausted={exhausted}
					isPending={isPending}
					isError={isError}
					onSend={send}
					className="sticky top-[70px]"
				/>
			</ShowOnDesktop>
			<ShowOnMobile>
				<AiAssistantFab onOpen={onOpen} />
				<AiAssistantSheet open={open} onClose={onClose}>
					<AiAssistantPanel
						signals={overview.signals}
						prompts={overview.prompts}
						chat={history}
						streamed={streamed}
						quota={quota}
						exhausted={exhausted}
						isPending={isPending}
						isError={isError}
						onSend={send}
						className="w-full"
						onClose={onClose}
					/>
				</AiAssistantSheet>
			</ShowOnMobile>
		</>
	);
};

PlanningAiAssistant.displayName = 'PlanningAiAssistant';

export { PlanningAiAssistant };
