import type { FC } from "react";
import { useState } from "react";
import { createPortal } from "react-dom";

import { useIsDesktop } from "@shared/utils";
import { AiAssistantPanel } from "./AiAssistantPanel.tsx";

const SparkleIcon: FC = () => (
	<svg width="20" height="20" viewBox="5 2 14 14" fill="#fff">
		<path d="M12 2l1.6 5.4L19 9l-5.4 1.6L12 16l-1.6-5.4L5 9l5.4-1.6L12 2z" />
	</svg>
);

const PlanningAiAssistant: FC = () => {
	const isDesktop = useIsDesktop();
	const [open, setOpen] = useState(false);

	if (isDesktop) {
		return <AiAssistantPanel className="sticky top-[70px]" comingSoon />;
	}

	return (
		<>
			{createPortal(
				<button
					type="button"
					aria-label="Open AI assistant"
					onClick={() => { setOpen(true); }}
					className="finance-theme fixed bottom-5 right-5 z-30 flex size-14 items-center justify-center rounded-full bg-[image:var(--accent-grad)] shadow-[0_8px_24px_var(--glow)]"
				>
					<SparkleIcon />
				</button>,
				document.body
			)}

			{open ? createPortal(
				<div className="finance-theme">
					<div onClick={() => { setOpen(false); }} className="fixed inset-0 z-40 bg-black/50 backdrop-blur-[2px] animate-in fade-in duration-150" />
					<div className="fixed inset-x-3 bottom-3 top-16 z-[41] flex animate-in slide-in-from-bottom duration-200">
						<AiAssistantPanel className="w-full" comingSoon onClose={() => { setOpen(false); }} />
					</div>
				</div>,
				document.body
			) : null}
		</>
	);
};

PlanningAiAssistant.displayName = 'PlanningAiAssistant';

export { PlanningAiAssistant };
