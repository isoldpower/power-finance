import {useCallback, useSyncExternalStore} from "react";
import {localStorageGetItem} from "./helpers.ts";

const LOCAL_STORAGE_EVENT = "localStorage";
class LocalStorageEvent extends Event {
	constructor(readonly key: string) {
		super(LOCAL_STORAGE_EVENT, { bubbles: true });
	}
}

function useStorageData(
	storageKey: string
): string | undefined {
	const subscribe = useCallback((onStorageChange: () => void) => {
		function listener(event: Event) {
			if (event.type === LOCAL_STORAGE_EVENT) {
				const parsedEvent = event as LocalStorageEvent;
				parsedEvent.key === storageKey && onStorageChange();
			}
		}

		window.addEventListener(LOCAL_STORAGE_EVENT, listener);
		return () => {
			window.removeEventListener(LOCAL_STORAGE_EVENT, listener);
		}
	}, [storageKey]);

	const getSnapshot = useCallback(() => {
		const value = localStorageGetItem(storageKey);
		return value ? value : undefined;
	}, [storageKey]);

	return useSyncExternalStore(subscribe, getSnapshot);
}

export { useStorageData, LocalStorageEvent, LOCAL_STORAGE_EVENT };