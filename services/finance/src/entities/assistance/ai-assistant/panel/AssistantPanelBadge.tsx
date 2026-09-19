import { cn } from "@internal/ui-library";
import { SparkleIcon } from "@shared/pure-components/icons";

import type { FC } from "react";


const AssistantPanelBadge: FC = () => (
	<div
		className={cn(
			"flex size-7 flex-none items-center justify-center rounded-[8px]",
			"bg-[image:var(--accent-grad)] shadow-[0_2px_8px_var(--glow)]"
		)}
	>
		<SparkleIcon size={15} />
	</div>
);

AssistantPanelBadge.displayName = 'AssistantPanelBadge';

export { AssistantPanelBadge };
