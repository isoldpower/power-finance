import { SparkleIcon } from "@shared/pure-components/icons";
import type { FC } from "react";

import { BodyText, Text } from "@shared/pure-components/typography";


const AssistantComingSoonOverlay: FC = () => (
	<div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 bg-card/30 backdrop-blur-[3px]">
		<Text size="13" weight="semibold" tone="accent" className="flex items-center gap-2 rounded-full border border-[var(--accent-border)] bg-[var(--accent-soft)] px-4 py-1.5 shadow-[var(--shadow)]">
			<SparkleIcon size={14} accent />
			Coming soon
		</Text>
		<BodyText as="span" size="11.5">
			AI assistant is on the way
		</BodyText>
	</div>
);

AssistantComingSoonOverlay.displayName = 'AssistantComingSoonOverlay';

export { AssistantComingSoonOverlay };
