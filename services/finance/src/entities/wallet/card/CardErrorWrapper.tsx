import type { FC, ReactNode } from "react";

interface CardErrorWrapperProps {
	children: ReactNode;
}

const CardErrorWrapper: FC<CardErrorWrapperProps> = ({ children }) => {
	return (
		<div className='bg-red-300 opacity-50'>
			{ children }
		</div>
	)
}

CardErrorWrapper.displayName = 'CardErrorWrapper';

export { CardErrorWrapper };