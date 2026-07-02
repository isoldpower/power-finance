import type { FC } from "react";
import { cn } from "@internal/ui-library";

interface AssistantMessage {
	id: string;
	role: 'assistant' | 'user';
	text: string;
	refs?: string[];
}

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
			<div className="text-[12.5px] leading-relaxed">{text}</div>
			{refs ? (
				<div className="mt-2 flex flex-wrap gap-1.5">
					{refs.map((ref) => (
						<span
							key={ref}
							className={cn(
								"rounded-full border px-2 py-0.5 font-numeric text-[9.5px] font-semibold",
								role === 'user'
									? "border-white/30 text-white"
									: "border-[var(--accent-border)] bg-[var(--accent-soft)] text-primary"
							)}
						>
							{ref}
						</span>
					))}
				</div>
			) : null}
		</div>
	</div>
);

AssistantChatBubble.displayName = 'AssistantChatBubble';

export { AssistantChatBubble };
export type { AssistantChatBubbleProps, AssistantMessage };
