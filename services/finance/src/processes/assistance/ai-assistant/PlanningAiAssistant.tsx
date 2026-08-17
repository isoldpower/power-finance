import { useMemo } from "react";

import { AiAssistantFab, AiAssistantPanel, AiAssistantSheet } from "@widget/assistance";
import { ShowOnDesktop, ShowOnMobile } from "@shared/visibility";
import { useDisclosure } from "@shared/overlays";
import { useAssistantMessages, useAssistantOverview } from "@feature/assistance";

import type { FC } from "react";


const PlanningAiAssistant: FC = () => {
	const { open, onOpen, onClose } = useDisclosure();
	const { overview } = useAssistantOverview();
	const { messages } = useAssistantMessages();
	const chat = useMemo(() => [...messages].reverse(), [messages]);

	return (
		<>
			<ShowOnDesktop>
				<AiAssistantPanel
					signals={overview.signals}
					prompts={overview.prompts}
					chat={chat}
					className="sticky top-[70px]"
					comingSoon={true}
				/>
			</ShowOnDesktop>
			<ShowOnMobile>
				<AiAssistantFab onOpen={onOpen} />
				<AiAssistantSheet open={open} onClose={onClose}>
					<AiAssistantPanel
						signals={overview.signals}
						prompts={overview.prompts}
						chat={chat}
						className="w-full"
						comingSoon={true}
						onClose={onClose}
					/>
				</AiAssistantSheet>
			</ShowOnMobile>
		</>
	);
};

PlanningAiAssistant.displayName = 'PlanningAiAssistant';

export { PlanningAiAssistant };
