import type { FC } from "react";

interface CardsListErrorProps {
	amount?: number;
}

const CardsListError: FC<CardsListErrorProps> = ({
	amount = 3
}: CardsListErrorProps) => {
	return (
		<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
			{Array.from({ length: amount }).map((_, i) => (
				<div key={`wallet-error-${i.toString()}`} className="bg-red-100 dark:bg-red-900 h-28 rounded-lg" />
			))}
		</div>
	)
}

CardsListError.displayName = 'CardsListError';

export { CardsListError };
export type { CardsListErrorProps };