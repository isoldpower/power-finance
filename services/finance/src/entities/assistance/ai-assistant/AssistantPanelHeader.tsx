import type { FC } from "react";

import { SparkleIcon } from "../icons/SparkleIcon.tsx";


interface AssistantPanelHeaderProps {
	onClose?: () => void;
}

const AssistantPanelHeader: FC<AssistantPanelHeaderProps> = ({ onClose }) => (
	<div className="flex items-center gap-2.5 border-b border-border px-4 py-3.5">
		<div className="flex size-7 flex-none items-center justify-center rounded-[8px] bg-[image:var(--accent-grad)] shadow-[0_2px_8px_var(--glow)]">
			<SparkleIcon size={15} />
		</div>
		<div className="flex-1">
			<div className="text-sm font-semibold">AI assistant</div>
			<div className="font-numeric text-[9.5px] text-text-3">grounded in your data</div>
		</div>
		<span className="size-2 flex-none rounded-full bg-pos" />
		{onClose ? (
			<button type="button" onClick={onClose} className="flex size-7 flex-none items-center justify-center rounded-[var(--radius-md)] border border-border-strong text-text-2 hover:bg-secondary lg:hidden">✕</button>
		) : null}
	</div>
);

AssistantPanelHeader.displayName = 'AssistantPanelHeader';

export { AssistantPanelHeader };
export type { AssistantPanelHeaderProps };
