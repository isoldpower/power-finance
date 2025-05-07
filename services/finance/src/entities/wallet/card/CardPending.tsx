import type { FC, ReactNode } from "react";


interface CardPendingProps {
	children?: ReactNode;
}

const CardPending: FC<CardPendingProps> = ({ children }) => {
	return (
		<div className='animate-pulse h-28 rounded-lg bg-gray-100'>
			{ children }
		</div>
	)
}

CardPending.displayName = 'CardPending';

export { CardPending };