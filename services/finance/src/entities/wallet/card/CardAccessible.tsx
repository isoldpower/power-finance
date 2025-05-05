import type { FC, ReactNode } from "react";

interface CardAccessibleProps {
	children: ReactNode;
}

const CardAccessible: FC<CardAccessibleProps> = ({ children }) => {
	return (
		<div className='duration-200 hover:shadow-md rounded-lg'>
			{ children }
		</div>
	)
}

CardAccessible.displayName = 'CardAccessible';

export { CardAccessible };