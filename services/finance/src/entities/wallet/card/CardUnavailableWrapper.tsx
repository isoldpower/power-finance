import type { FC, ReactNode } from "react";


interface CardUnavailableWrapperProps {
	children?: ReactNode;
}

const CardUnavailableWrapper: FC<CardUnavailableWrapperProps> = ({ children }) => {
	return (
		<div className='opacity-50'>
			{ children }
		</div>
	)
}

CardUnavailableWrapper.displayName = 'CardUnavailableWrapper';

export { CardUnavailableWrapper };