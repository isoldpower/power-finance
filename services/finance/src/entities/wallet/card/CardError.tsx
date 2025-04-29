import type { FC, ReactNode } from "react";

interface CardErrorProps {
	children: ReactNode;
}

const CardError: FC<CardErrorProps> = ({ children }) => {
	return (
		<div className='bg-red-300 opacity-50'>
			{ children }
		</div>
	)
}

CardError.displayName = 'CardError';

export { CardError };