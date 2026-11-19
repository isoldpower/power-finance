import type { FC, ReactNode } from "react";


interface HideOnCompactProps {
	compact: boolean;
	children: ReactNode;
}

const HideOnCompact: FC<HideOnCompactProps> = ({ compact, children }) => {
	if (compact) {
		return null;
	}

	return children;
};

HideOnCompact.displayName = 'HideOnCompact';

export { HideOnCompact };
export type { HideOnCompactProps };
