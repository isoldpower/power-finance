import { DemoPreparationScreen } from "@entity/accounts";

import { PREPARATION_MESSAGES, PREPARATION_MESSAGE_INTERVAL_MS } from "./config.ts";
import { useRotatingMessageIndex } from "@feature/accounts/guest-demo-preparation/use-rotating-message-index.ts";

import type { FC } from "react";


const DemoPreparationProgress: FC = () => {
	const messageIndex = useRotatingMessageIndex({
		messagesList: [...PREPARATION_MESSAGES],
		messageIntervalMs: PREPARATION_MESSAGE_INTERVAL_MS,
	});

	return (
		<DemoPreparationScreen.Status key={messageIndex}>
			{PREPARATION_MESSAGES[messageIndex]}
		</DemoPreparationScreen.Status>
	);
};

DemoPreparationProgress.displayName = 'DemoPreparationProgress';

export { DemoPreparationProgress };
