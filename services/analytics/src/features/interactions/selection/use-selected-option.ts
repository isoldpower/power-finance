import { useMemo, useState } from "react";


interface SelectedOption<T> {
	selected: T;
	select: (option: T) => void;
}

const useSelectedOption = <T>(initial: T): SelectedOption<T> => {
	const [selected, select] = useState<T>(initial);

	return useMemo(() => ({ selected, select }), [selected]);
};

export { useSelectedOption };
export type { SelectedOption };
