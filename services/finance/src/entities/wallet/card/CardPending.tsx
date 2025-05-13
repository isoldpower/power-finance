import type { FC } from "react";


type CardPendingProps = object & {};

const CardPending: FC<CardPendingProps> = () => {
	return (
		<div className='animate-pulse bg-gray-100 dark:bg-gray-900 h-36 rounded-lg' />
	);
};

CardPending.displayName = 'CardPending';

export { CardPending };