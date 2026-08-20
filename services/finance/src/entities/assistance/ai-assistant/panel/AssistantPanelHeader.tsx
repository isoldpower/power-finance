import { cn } from "@internal/ui-library";
import { SparkleIcon } from "@shared/pure-components/icons";
import { CardTitle, MetaText } from "@shared/pure-components/typography";

import type { FC } from "react";


interface AssistantPanelHeaderProps {
	onClose?: () => void;
}

const AssistantPanelHeader: FC<AssistantPanelHeaderProps> = ({ onClose }) => (
	<div className="flex items-center gap-2.5 border-b border-border px-4 py-3.5">
		<div
			className={cn(
				"flex size-7 flex-none items-center justify-center rounded-[8px]",
				"bg-[image:var(--accent-grad)] shadow-[0_2px_8px_var(--glow)]"
			)}
		>
			<SparkleIcon size={15} />
		</div>
		<div className="flex-1">
			<CardTitle as="h2">AI assistant</CardTitle>
			<MetaText as="div" size="9.5">grounded in your data</MetaText>
		</div>
		<span className="size-2 flex-none rounded-full bg-pos" />
		{onClose ? (
			<button
				type="button"
				onClick={onClose}
				className={cn(
					"flex size-7 flex-none items-center justify-center rounded-[var(--radius-md)]",
					"border border-border-strong text-text-2 hover:bg-secondary lg:hidden"
				)}
			>
				✕
			</button>
		) : null}
	</div>
);

AssistantPanelHeader.displayName = 'AssistantPanelHeader';

export { AssistantPanelHeader };
export type { AssistantPanelHeaderProps };
