import { useMemo } from "react";

import type { FC, ReactNode } from "react";


interface StackedListProps {
	children?: ReactNode;
	gap?: number;
}

const StackedList: FC<StackedListProps> = ({
	children,
	gap = 4,
}) => {
	const listGap = useMemo<string>(() => gap.toString(), [gap]);

	return (
		<div
			className="flex flex-col"
			style={{ gap: `calc(var(--spacing) * ${listGap})` }}
		>
			{children}
		</div>
	);
}

StackedList.displayName = 'StackedList';

export { StackedList };
export type { StackedListProps };
