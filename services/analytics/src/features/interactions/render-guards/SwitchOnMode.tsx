import type { ReactNode } from "react";


interface SwitchOnModeProps<M extends string> {
	mode: M;
	views: Record<M, ReactNode>;
}

function SwitchOnMode<M extends string>({ mode, views }: SwitchOnModeProps<M>): ReactNode {
	return views[mode];
}

SwitchOnMode.displayName = 'SwitchOnMode';

export { SwitchOnMode };
export type { SwitchOnModeProps };
