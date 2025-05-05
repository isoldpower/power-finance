import { useLocaleDate } from "@shared/utils";
import type { FC } from "react";


interface TransactionSinceProps {
	date: string;
}

const TransactionSince: FC<TransactionSinceProps> = ({ date }) => {
	const localeDate = useLocaleDate(date);

	return (
		<div className="text-lg font-bold text-gray-800">
			{localeDate}
		</div>
	);
};

TransactionSince.displayName = 'TransactionSince';

export { TransactionSince };
export type { TransactionSinceProps };