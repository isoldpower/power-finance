import { useCallback, useState } from "react";


const readCompletion = (storageKey: string | undefined, fallback: boolean): boolean => {
	if (!storageKey) return fallback;

	try {
		const stored = window.localStorage.getItem(storageKey);

		return stored === null ? fallback : stored === 'true';
	} catch {
		return fallback;
	}
};

const useTourCompletion = (
	storageKey: string | undefined,
	initial: boolean
): [boolean, (value: boolean) => void] => {
	const [completed, setCompleted] = useState(() => readCompletion(storageKey, initial));

	const persist = useCallback((value: boolean) => {
		setCompleted(value);

		if (!storageKey) return;

		try {
			window.localStorage.setItem(storageKey, String(value));
		} catch {
			// storage is unavailable — completion stays in memory for this session
		}
	}, [storageKey]);

	return [completed, persist];
};

export { useTourCompletion };
