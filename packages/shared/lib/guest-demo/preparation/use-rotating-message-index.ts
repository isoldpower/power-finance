import { useEffect, useState } from "react";


interface UseRotatingMessageIndexOptions {
	messageIntervalMs: number;
	messageCount: number;
}

function useRotatingMessageIndex({ messageIntervalMs, messageCount }: UseRotatingMessageIndexOptions): number {
	const [messageIndex, setMessageIndex] = useState(0);

	useEffect(() => {
		const intervalId = window.setInterval(() => {
			setMessageIndex((index) => (index + 1) % messageCount);
		}, messageIntervalMs);

		return () => {
			window.clearInterval(intervalId);
		};
	}, [messageIntervalMs, messageCount]);

	return messageIndex;
}

export { useRotatingMessageIndex };
export type { UseRotatingMessageIndexOptions };
