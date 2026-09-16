import { cn } from "@internal/ui-library";
import { Text } from "@shared/pure-components/typography";

import type { FC } from "react";


interface AssistantQuotaNoteProps {
	messagesLeft: number;
	allowance: number;
	low?: boolean;
	exhausted?: boolean;
}

const AssistantQuotaNote: FC<AssistantQuotaNoteProps> = ({
	messagesLeft,
	allowance,
	low = false,
	exhausted = false,
}) => (
	<Text
		as="span"
		size="11"
		weight="semibold"
		className={cn("mb-1.5 block", exhausted || low ? "text-neg" : "text-[var(--text-3)]")}
	>
		{exhausted
			? 'No messages left'
			: `${messagesLeft.toString()} of ${allowance.toString()} messages left`}
	</Text>
);

AssistantQuotaNote.displayName = 'AssistantQuotaNote';

export { AssistantQuotaNote };
export type { AssistantQuotaNoteProps };
