import { useNavigate, useSearch } from "@tanstack/react-router";
import { useCallback } from "react";


interface UseTransactionModalOptions {
	searchKey?: string;
}

const useTransactionModal = ({
	searchKey = 'newTransaction'
}: UseTransactionModalOptions) => {
	const navigate = useNavigate();
	const related = useSearch({ strict: false });

	const openTransactionModal = useCallback((open: boolean) => {
		navigate({
			to: '.',
			search: (prev: object) => ({ ...prev, [searchKey]: open }),
		});
	}, [navigate, searchKey]);

	return {
		openTransactionModal,
		open: related[searchKey],
	}
}

export { useTransactionModal };
export type { UseTransactionModalOptions };
