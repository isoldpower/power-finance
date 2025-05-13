import type { FC, ReactNode } from "react";

interface CardAccessibleWrapperProps {
	children?: ReactNode;
}

const CardAccessibleWrapper: FC<CardAccessibleWrapperProps> = ({ children }) => {
	return (
		<div className='duration-200 hover:shadow-md rounded-lg bg-red-500'>
			{ children }
		</div>
	)
}

CardAccessibleWrapper.displayName = 'CardAccessibleWrapper';

export { CardAccessibleWrapper };