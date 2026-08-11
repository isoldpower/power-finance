import type { AssistantMessage } from "../types.ts";
import type { FC } from "react";
import { cn } from "@internal/ui-library";
import { BodyText, Text } from "@shared/pure-components/typography";


interface AssistantChatBubbleProps {
	role: AssistantMessage['role'];
	text: string;
	refs?: string[];
}

const AssistantChatBubble: FC<AssistantChatBubbleProps> = ({ role, text, refs }) => (
	<div className={cn("flex", role === 'user' ? "justify-end" : "justify-start")}>
		<div
			className={cn(
				"max-w-[85%] rounded-[var(--radius-md)] px-3 py-2",
				role === 'user'
					? "bg-[image:var(--accent-grad)] text-white"
					: "border border-border bg-secondary text-foreground"
			)}
		>
			<BodyText as="div" size="12.5" tone="default" leading="relaxed">
				{text}
			</BodyText>
			{refs ? (
				<div className="mt-2 flex flex-wrap gap-1.5">
					{refs.map((ref) => (
						<Text
							key={ref}
							family="numeric"
							size="9.5"
							weight="semibold"
							className={cn(
								"rounded-full border px-2 py-0.5",
								role === 'user'
									? "border-white/30 text-white"
									: "border-[var(--accent-border)] bg-[var(--accent-soft)] text-primary"
							)}
						>
							{ref}
						</Text>
					))}
				</div>
			) : null}
		</div>
	</div>
);

AssistantChatBubble.displayName = 'AssistantChatBubble';

export { AssistantChatBubble };
export type { AssistantChatBubbleProps };
