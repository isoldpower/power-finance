import type { FC } from "react";

interface CardsListPendingProps {
	amount?: number;
}

const CardsListPending: FC<CardsListPendingProps> = ({
	amount = 3
}: CardsListPendingProps) => {
	return (
		<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 animate-pulse">
			{Array.from({ length: amount }).map((_, i) => (
				<div key={i} className="bg-gray-100 h-28 rounded-lg" />
			))}
		</div>
	)
}

CardsListPending.displayName = 'CardsListPending';

export { CardsListPending };
export type { CardsListPendingProps };