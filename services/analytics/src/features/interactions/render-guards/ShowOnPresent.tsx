import type { ReactNode } from "react";


interface ShowOnPresentProps<T> {
	value: T | null | undefined;
	fallback?: ReactNode;
	children: (value: T) => ReactNode;
}

function ShowOnPresent<T>({ value, fallback = null, children }: ShowOnPresentProps<T>): ReactNode {
	if (value === null || value === undefined) {
		return fallback;
	}

	return children(value);
}

ShowOnPresent.displayName = 'ShowOnPresent';

export { ShowOnPresent };
export type { ShowOnPresentProps };
