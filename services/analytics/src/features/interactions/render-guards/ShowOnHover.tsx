import type { ReactNode } from "react";


interface ShowOnHoverProps<T> {
	target: T | null | undefined;
	children: (target: T) => ReactNode;
}

function ShowOnHover<T>({ target, children }: ShowOnHoverProps<T>): ReactNode {
	if (target === null || target === undefined) {
		return null;
	}

	return children(target);
}

ShowOnHover.displayName = 'ShowOnHover';

export { ShowOnHover };
export type { ShowOnHoverProps };
