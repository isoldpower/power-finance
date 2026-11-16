import { useGuestDemoEarlyEntry, useRotatingMessageIndex } from "../preparation/index.ts";
import { DemoPreparationScreen } from "./preparation-screen/index.ts";
import {
	EARLY_ENTRY_NOTICE,
	PREPARATION_DESCRIPTION,
	PREPARATION_HEADING,
	PREPARATION_MESSAGE_INTERVAL_MS,
	PREPARATION_MESSAGES,
} from "./config.ts";

import type { FC, ReactNode } from "react";


interface GuestDemoPreparationProps {
	renderContinue: (enter: () => void) => ReactNode;
}

const GuestDemoPreparation: FC<GuestDemoPreparationProps> = ({ renderContinue }) => {
	const { available, enter } = useGuestDemoEarlyEntry();
	const messageIndex = useRotatingMessageIndex({
		messageCount: PREPARATION_MESSAGES.length,
		messageIntervalMs: PREPARATION_MESSAGE_INTERVAL_MS,
	});

	return (
		<DemoPreparationScreen>
			<DemoPreparationScreen.Heading>
				{PREPARATION_HEADING}
			</DemoPreparationScreen.Heading>
			<DemoPreparationScreen.Description>
				{PREPARATION_DESCRIPTION}
			</DemoPreparationScreen.Description>
			<DemoPreparationScreen.Status key={messageIndex}>
				{PREPARATION_MESSAGES[messageIndex]}
			</DemoPreparationScreen.Status>
			{available ? (
				<DemoPreparationScreen.Notice>
					{EARLY_ENTRY_NOTICE}
					<DemoPreparationScreen.Actions>
						{renderContinue(enter)}
					</DemoPreparationScreen.Actions>
				</DemoPreparationScreen.Notice>
			) : null}
		</DemoPreparationScreen>
	);
};

GuestDemoPreparation.displayName = 'GuestDemoPreparation';

export { GuestDemoPreparation };
export type { GuestDemoPreparationProps };
