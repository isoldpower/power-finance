import { cn } from "@internal/ui-library";
import { Text } from "@shared/pure-components/typography";

import type { FC } from "react";
import type { ResourceRef } from "../../types.ts";


interface AssistantChatRefsProps {
	refs: ResourceRef[];
	chipClassName: string;
}

const AssistantChatRefs: FC<AssistantChatRefsProps> = ({ refs, chipClassName }) => (
	<div className="mt-2 flex flex-wrap gap-1.5">
		{refs.map((ref) => (
			<Text
				key={`${ref.type}-${ref.id}`}
				family="numeric"
				size="9.5"
				weight="semibold"
				className={cn("rounded-full border px-2 py-0.5", chipClassName)}
			>
				{ref.type.charAt(0).toUpperCase() + ref.type.slice(1)}
			</Text>
		))}
	</div>
);

AssistantChatRefs.displayName = 'AssistantChatRefs';

export { AssistantChatRefs };
export type { AssistantChatRefsProps };
