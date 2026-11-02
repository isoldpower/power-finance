import { useEffect, useState } from "react";


interface UseRotatingMessageIndexOptions {
	messageIntervalMs: number;
	messagesList: string[];
}

function useRotatingMessageIndex({ 
	messageIntervalMs,
	messagesList
}: UseRotatingMessageIndexOptions): number {
	const [messageIndex, setMessageIndex] = useState(0);

	useEffect(() => {
		const intervalId = window.setInterval(() => {
			setMessageIndex((index) => (index + 1) % messagesList.length);
		}, messageIntervalMs);

		return () => {
			window.clearInterval(intervalId);
		};
	}, [messageIntervalMs, messagesList.length]);

	return messageIndex;
}

export { useRotatingMessageIndex };
