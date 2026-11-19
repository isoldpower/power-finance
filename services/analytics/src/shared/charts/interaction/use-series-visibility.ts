import { useCallback, useMemo, useState } from "react";


interface SeriesVisibility {
	hidden: ReadonlySet<string>;
	focused: string | null;
	isVisible: (key: string) => boolean;
	toggle: (key: string) => void;
	focus: (key: string | null) => void;
}

const useSeriesVisibility = (): SeriesVisibility => {
	const [hidden, setHidden] = useState<ReadonlySet<string>>(new Set());
	const [focused, setFocused] = useState<string | null>(null);

	const toggle = useCallback((key: string) => {
		setHidden((current) => {
			const next = new Set(current);
			if (next.has(key)) {
				next.delete(key);
			}
			else {
				next.add(key);
			}

			return next;
		});
	}, []);

	const isVisible = useCallback((key: string) => !hidden.has(key), [hidden]);

	return useMemo(() => ({
		hidden,
		focused,
		isVisible,
		toggle,
		focus: setFocused,
	}), [hidden, focused, isVisible, toggle]);
};

export { useSeriesVisibility };
export type { SeriesVisibility };
