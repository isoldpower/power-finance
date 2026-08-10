import { AiAssistantFab, AiAssistantPanel, AiAssistantSheet } from "@widget/assistance";
import { ShowOnDesktop, ShowOnMobile } from "@shared/components";
import { useDisclosure } from "@shared/interactions";

import type { FC } from "react";
import type { AssistantMessage, AssistantSignal } from "@entity/assistance";


interface PlanningAiAssistantProps {
	signals: AssistantSignal[];
	chat: AssistantMessage[];
	prompts: string[];
}

const PlanningAiAssistant: FC<PlanningAiAssistantProps> = ({
	...mockContent
}) => {
	const { open, onOpen, onClose } = useDisclosure();

	return (
		<>
			<ShowOnDesktop>
				<AiAssistantPanel
					{...mockContent}
					className="sticky top-[70px]"
					comingSoon={true}
				/>
			</ShowOnDesktop>
			<ShowOnMobile>
				<AiAssistantFab onOpen={onOpen} />
				<AiAssistantSheet open={open} onClose={onClose}>
					<AiAssistantPanel
						{...mockContent}
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
