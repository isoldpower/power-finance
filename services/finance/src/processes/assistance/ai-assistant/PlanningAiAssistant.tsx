import { AiAssistantFab, AiAssistantPanel, AiAssistantSheet } from "@widget/assistance";
import { ShowOnDesktop, ShowOnMobile } from "@shared/visibility";
import { useDisclosure } from "@shared/overlays";
import { useAssistantContent } from "@feature/assistance";

import type { FC } from "react";


const PlanningAiAssistant: FC = () => {
	const { open, onOpen, onClose } = useDisclosure();
	const { content } = useAssistantContent();

	return (
		<>
			<ShowOnDesktop>
				<AiAssistantPanel
					{...content}
					className="sticky top-[70px]"
					comingSoon={true}
				/>
			</ShowOnDesktop>
			<ShowOnMobile>
				<AiAssistantFab onOpen={onOpen} />
				<AiAssistantSheet open={open} onClose={onClose}>
					<AiAssistantPanel
						{...content}
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
