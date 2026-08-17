import { AssistantOverlay } from "@entity/assistance";
import { AttachToLayout } from "@shared/pure-components/layout";
import { ShowOnOpen } from "@shared/overlays";

import type { FC, ReactNode } from "react";


interface AiAssistantSheetProps {
	open: boolean;
	onClose: () => void;
	children: ReactNode;
}

const AiAssistantSheet: FC<AiAssistantSheetProps> = ({ open, onClose, children }) => {
	return (
		<ShowOnOpen open={open}>
			<AttachToLayout>
				<AssistantOverlay>
					<AssistantOverlay.Scrim onClick={onClose} />
					<AssistantOverlay.Sheet>
						{children}
					</AssistantOverlay.Sheet>
				</AssistantOverlay>
			</AttachToLayout>
		</ShowOnOpen>
	);
};

AiAssistantSheet.displayName = 'AiAssistantSheet';

export { AiAssistantSheet };
export type { AiAssistantSheetProps };
