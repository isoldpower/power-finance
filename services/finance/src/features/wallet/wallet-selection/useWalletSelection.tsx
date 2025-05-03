import { useSearch, useNavigate } from "@tanstack/react-router";
import { useCallback } from "react";

interface UseWalletSelectionProps {
	searchKey?: string;
}

const useWalletSelection = ({
	searchKey = 'wallet'
}: UseWalletSelectionProps) => {
	const navigate = useNavigate();
	const related = useSearch({ strict: false });

	const setSelected = useCallback((selected: string | undefined) => {
		navigate({
			to: '.',
			search: (prev: object) => ({ ...prev, [searchKey]: selected }),
		});
	}, [searchKey]);

	return {
		setSelected,
		selected: related[searchKey],
	}
}

export { useWalletSelection };
export type { UseWalletSelectionProps };