import { useEffect, useState } from "react";


const DEFAULT_DELAY_MS = 300;

function useDebounce<TValue>(value: TValue, delayMs: number = DEFAULT_DELAY_MS): TValue {
	const [debounced, setDebounced] = useState<TValue>(value);

	useEffect(() => {
		if (delayMs <= 0) {
			setDebounced(value);

			return undefined;
		}

		const timeout = setTimeout(() => { setDebounced(value); }, delayMs);

		return () => { clearTimeout(timeout); };
	}, [value, delayMs]);

	return debounced;
}

export { DEFAULT_DELAY_MS, useDebounce };
