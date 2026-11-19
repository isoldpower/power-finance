import { useMemo } from "react";
import { Text } from "@internal/shared";

import type { FC, ReactNode } from "react";


interface CounterpartyRowNameProps {
	rank: number;
	name: string;
	caption: ReactNode;
}

const CounterpartyRowName: FC<CounterpartyRowNameProps> = ({ rank, name, caption }) => {
	const rankLabel = useMemo(() => {
		return rank.toString().padStart(2, '0');
	}, [rank]);

	return (
		<span className="flex min-w-0 items-center gap-2.5">
			<Text size="11" family="numeric" tone="subtle" className="w-5 shrink-0 text-right">
				{rankLabel}
			</Text>
			<span className="flex min-w-0 flex-col">
				<Text size="13" weight="semibold" truncate>
					{name}
				</Text>
				<Text size="11" tone="subtle" truncate>
					{caption}
				</Text>
			</span>
		</span>
	);
};

CounterpartyRowName.displayName = 'CounterpartyRowName';

export { CounterpartyRowName };
export type { CounterpartyRowNameProps };
