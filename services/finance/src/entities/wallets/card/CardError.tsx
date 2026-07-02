import type { FC, ReactNode } from "react";


interface CardErrorProps {
	children?: ReactNode;
}

const CardError: FC<CardErrorProps> = ({ children }) => {
	return (
		<div className='bg-red-100 h-28 rounded-lg'>
			{ children }
		</div>
	)
}

CardError.displayName = 'CardError';

export { CardError };