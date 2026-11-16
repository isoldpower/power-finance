import { useMemo } from "react";

import type { FC, ReactNode } from "react";


interface StackedListProps {
	children?: ReactNode;
	gap?: number;
	id?: string;
}

const StackedList: FC<StackedListProps> = ({
	children,
	gap = 4,
	id,
}) => {
	const listGap = useMemo<string>(() => gap.toString(), [gap]);

	return (
		<div
			id={id}
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
