import type { FC, ReactNode } from "react";

interface CardsListProps {
	children: ReactNode;
}

const CardsList: FC<CardsListProps> = ({ children }) => {
	return (
		<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
			{children}
		</div>
	)
}

CardsList.displayName = 'CardsList';

export { CardsList };
export type { CardsListProps };