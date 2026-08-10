import { AssistantOverlay, SparkleIcon } from "@entity/assistance";
import { AttachToLayout } from "@shared/components";

import type { FC } from "react";


interface AiAssistantFabProps {
	onOpen: () => void;
}

const AiAssistantFab: FC<AiAssistantFabProps> = ({ onOpen }) => {
	return (
		<AttachToLayout>
			<AssistantOverlay.Fab aria-label="Open AI assistant" onClick={onOpen}>
				<SparkleIcon size={20} />
			</AssistantOverlay.Fab>
		</AttachToLayout>
	);
};

AiAssistantFab.displayName = 'AiAssistantFab';

export { AiAssistantFab };
export type { AiAssistantFabProps };
