import type { ReactNode } from "react";


interface ShowOnModeProps<M extends string> {
	mode: M;
	on: M;
	children: ReactNode;
}

function ShowOnMode<M extends string>({ mode, on, children }: ShowOnModeProps<M>): ReactNode {
	if (mode !== on) {
		return null;
	}

	return children;
}

ShowOnMode.displayName = 'ShowOnMode';

export { ShowOnMode };
export type { ShowOnModeProps };
