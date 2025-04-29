import {FC, ReactNode} from "react";

interface CardUnavailableProps {
	children?: ReactNode;
}

const CardUnavailable: FC<CardUnavailableProps> = ({ children }) => {
	return (
		<div className='opacity-50'>
			{ children }
		</div>
	)
}

CardUnavailable.displayName = 'CardUnavailable';

export { CardUnavailable };