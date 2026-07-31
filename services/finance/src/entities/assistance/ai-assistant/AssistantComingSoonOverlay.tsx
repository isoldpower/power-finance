import type { FC } from "react";

import { SparkleIcon } from "../icons/SparkleIcon.tsx";


const AssistantComingSoonOverlay: FC = () => (
	<div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 bg-card/30 backdrop-blur-[3px]">
		<span className="flex items-center gap-2 rounded-full border border-[var(--accent-border)] bg-[var(--accent-soft)] px-4 py-1.5 text-[13px] font-semibold text-primary shadow-[var(--shadow)]">
			<SparkleIcon size={14} accent />
			Coming soon
		</span>
		<span className="text-[11.5px] text-text-2">
			AI assistant is on the way
		</span>
	</div>
);

AssistantComingSoonOverlay.displayName = 'AssistantComingSoonOverlay';

export { AssistantComingSoonOverlay };
