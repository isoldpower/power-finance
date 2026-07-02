import type { FC } from "react";
import { createPortal } from "react-dom";

import { useIsDesktop } from "@shared/utils";
import { SparkleIcon } from "@entity/assistance";
import { AiAssistantPanel } from "@widget/assistance/ai-assistant/AiAssistantPanel.tsx";
import { MOCK_SIGNALS, MOCK_CHAT, MOCK_PROMPTS } from "@feature/assistance";
import { useDisclosure } from "@shared/interactions";

const PlanningAiAssistant: FC = () => {
	const isDesktop = useIsDesktop();
	const { open, onOpen, onClose } = useDisclosure();

	if (isDesktop) {
		return <AiAssistantPanel signals={MOCK_SIGNALS} chat={MOCK_CHAT} prompts={MOCK_PROMPTS} className="sticky top-[70px]" comingSoon />;
	}

	return (
		<>
			{createPortal(
				<button
					type="button"
					aria-label="Open AI assistant"
					onClick={() => { onOpen(); }}
					className="finance-theme fixed bottom-5 right-5 z-30 flex size-14 items-center justify-center rounded-full bg-[image:var(--accent-grad)] shadow-[0_8px_24px_var(--glow)]"
				>
					<SparkleIcon size={20} />
				</button>,
				document.body
			)}

			{open ? createPortal(
				<div className="finance-theme">
					<div onClick={() => { onClose(); }} className="fixed inset-0 z-40 bg-black/50 backdrop-blur-[2px] animate-in fade-in duration-150" />
					<div className="fixed inset-x-3 bottom-3 top-16 z-[41] flex animate-in slide-in-from-bottom duration-200">
						<AiAssistantPanel signals={MOCK_SIGNALS} chat={MOCK_CHAT} prompts={MOCK_PROMPTS} className="w-full" comingSoon onClose={() => { onClose(); }} />
					</div>
				</div>,
				document.body
			) : null}
		</>
	);
};

PlanningAiAssistant.displayName = 'PlanningAiAssistant';

export { PlanningAiAssistant };
