import { cn } from "@internal/ui-library";
import { AlertIcon } from "@shared/pure-components/icons";
import { BodyText, Text } from "@shared/pure-components/typography";

import type { FC } from "react";


interface AssistantChatErrorProps {
	message: string;
	onRetry?: () => void;
}

const AssistantChatError: FC<AssistantChatErrorProps> = ({ message, onRetry }) => (
	<div className="flex justify-start">
		<div
			className={cn(
				"flex max-w-[85%] items-start gap-2 rounded-[var(--radius-md)] px-3 py-2",
				"border border-neg/40 bg-neg-soft"
			)}
			role="alert"
		>
			<AlertIcon size={14} className="mt-0.5 flex-none text-neg" />
			<div className="flex min-w-0 flex-col items-start gap-1">
				<BodyText as="span" size="12.5" leading="relaxed">
					{message}
				</BodyText>
				{onRetry ? (
					<button type="button" onClick={onRetry}>
						<Text size="11.5" weight="semibold" tone="accent" className="underline">
							Try again
						</Text>
					</button>
				) : null}
			</div>
		</div>
	</div>
);

AssistantChatError.displayName = 'AssistantChatError';

export { AssistantChatError };
export type { AssistantChatErrorProps };
