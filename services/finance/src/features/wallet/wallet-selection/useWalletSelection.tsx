import { useSearch, useNavigate } from "@tanstack/react-router";
import { useCallback } from "react";
import {z} from "zod";


interface UseWalletSelectionProps {
	searchKey?: string;
}

const useWalletSelection = ({
	searchKey = 'wallet'
}: UseWalletSelectionProps) => {
	const navigate = useNavigate();
	const searchParams: unknown = useSearch({ strict: false });
	const related = z.object({
		[searchKey]: z.string().optional(),
	}).parse(searchParams);

	const setSelected = useCallback((selected: string | undefined) => {
		navigate({ to: '.', search: (prev: object) => ({ ...prev, [searchKey]: selected }) })
			.catch((err: unknown) => {
				console.error('Error selecting wallet:', err);
			});
	}, [navigate, searchKey]);

	return {
		setSelected,
		selected: related[searchKey],
	}
}

export { useWalletSelection };
export type { UseWalletSelectionProps };