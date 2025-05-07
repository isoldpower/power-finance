import { useCallback, useEffect, useMemo, useState } from 'react';

import { forceStorageUpdate, localStorageGetItem, parseStorageValue } from './helpers.js';
import { isDeepEqual } from "../helpers/index.js";
import type { UseLocalStorageReturn } from "./types.ts";
import { useStorageData } from "./use-data.ts";

function useLocalStorage<T>(
	key: string,
	initialState: T,
): UseLocalStorageReturn<T> {
	const actualValue = useStorageData(key);
	const [state, set] = useState(initialState);

	const multiValue = useMemo(() => initialState && typeof initialState === 'object', [initialState]);
	const canReset = useMemo(() => !isDeepEqual(state, initialState), [state, initialState]);

	useEffect(() => {
		const restoredValue = getStorage<T>(key);

		if (restoredValue) {
			if (multiValue) {
				set((prevValue) => ({ ...prevValue, ...restoredValue }));
			} else {
				set(restoredValue);
			}
		}
	}, [key, multiValue]);

	useEffect(() => {
		const parsedValue = parseStorageValue<T>(actualValue || '');

		if (parsedValue && JSON.stringify(parsedValue) !== JSON.stringify(state)) {
			if (multiValue) {
				set((prevValue) => ({ ...prevValue, ...parsedValue }));
			} else {
				set(parsedValue);
			}
		}
	}, [actualValue, multiValue, state]);

	const setState = useCallback(
		(updateState: Partial<T> | T) => {
			if (multiValue) {
				set((prevValue) => {
					setStorage<T>(key, { ...prevValue, ...updateState });

					return { ...prevValue, ...updateState };
				});
			} else {
				setStorage<T>(key, updateState as T);
				set(updateState as T);
			}
		},
		[key, multiValue]
	);

	const setField = useCallback(
		(name: keyof T, updateValue: T[keyof T]) => {
			if (multiValue) {
				setState({ [name]: updateValue } as Partial<T>);
			}
		},
		[multiValue, setState]
	);

	const resetState = useCallback(() => {
		set(initialState);
		removeStorage(key);
	}, [initialState, key]);

	return useMemo(
		() => ({
			canReset,
			resetState,
			setField,
			setState,
			state
		}),
		[canReset, resetState, setField, setState, state]
	);
}

function getStorage<T>(key: string): T | null {
	try {
		const result = localStorageGetItem(key);

		return parseStorageValue<T>(result);
	} catch (error) {
		console.error('Error while getting from storage:', error);
	}

	return null;
}

function setStorage<T>(key: string, value: T) {
	try {
		const serializedValue = JSON.stringify(value);

		window.localStorage.setItem(key, serializedValue);
		forceStorageUpdate(key);
	} catch (error) {
		console.error('Error while setting storage:', error);
	}
}

function removeStorage(key: string) {
	try {
		window.localStorage.removeItem(key);
		forceStorageUpdate(key);
	} catch (error) {
		console.error('Error while removing from storage:', error);
	}
}

export { useLocalStorage, getStorage, setStorage, removeStorage };
