import type { ReactNode } from "react";


interface ShowOnHoverAtProps<T, A> {
	target: T | null | undefined;
	at: A | null | undefined;
	children: (target: T, at: A) => ReactNode;
}

function ShowOnHoverAt<T, A>({ target, at, children }: ShowOnHoverAtProps<T, A>): ReactNode {
	const missingTarget = target === null || target === undefined;
	const missingPosition = at === null || at === undefined;

	if (missingTarget || missingPosition) {
		return null;
	}

	return children(target, at);
}

ShowOnHoverAt.displayName = 'ShowOnHoverAt';

export { ShowOnHoverAt };
export type { ShowOnHoverAtProps };
