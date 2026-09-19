import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { filterWalletOptions } from "@entity/wallets";

import { NO_HIGHLIGHT } from "./config.ts";

import type { KeyboardEvent, RefObject } from "react";
import type { WalletSelectItem } from "@entity/wallets";


interface UseWalletComboboxParams {
	options: WalletSelectItem[];
	onSelect: (id: string) => void;
}

interface UseWalletComboboxReturn {
	open: boolean;
	query: string;
	matches: WalletSelectItem[];
	highlighted: number;
	inputRef: RefObject<HTMLInputElement | null>;
	setOpen: (open: boolean) => void;
	setQuery: (query: string) => void;
	highlight: (index: number) => void;
	choose: (id: string) => void;
	onKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void;
}

const clampHighlight = (index: number, total: number): number => {
	if (total === 0) return NO_HIGHLIGHT;

	return (index + total) % total;
};

const useWalletCombobox = ({
	options,
	onSelect,
}: UseWalletComboboxParams): UseWalletComboboxReturn => {
	const [open, setOpen] = useState(false);
	const [query, setQuery] = useState('');
	const [highlighted, setHighlighted] = useState(NO_HIGHLIGHT);
	const inputRef = useRef<HTMLInputElement | null>(null);

	const comboboxMatches = useMemo(() => {
		return filterWalletOptions(options, query);
	}, [options, query]);

	useEffect(() => {
		if (!open) {
			setQuery('');
		}
	}, [open]);

	useEffect(() => {
		setHighlighted(comboboxMatches.length === 0 ? NO_HIGHLIGHT : 0);
	}, [comboboxMatches]);

	const choose = useCallback((id: string) => {
		onSelect(id);
		setOpen(false);
	}, [onSelect]);

	const onKeyDown = useCallback((event: KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
			event.preventDefault();
			const step = event.key === 'ArrowDown' ? 1 : -1;

			setHighlighted((previous) => clampHighlight(previous + step, comboboxMatches.length));

			return;
		}

		if (event.key === 'Enter') {
			const option = comboboxMatches[highlighted] as WalletSelectItem | undefined;

			if (option) {
				event.preventDefault();
				choose(option.id);
			}
		}
	}, [comboboxMatches, highlighted, choose]);

	return {
		open,
		query,
		matches: comboboxMatches,
		highlighted,
		inputRef,
		setOpen,
		setQuery,
		highlight: setHighlighted,
		choose,
		onKeyDown,
	};
};

export { useWalletCombobox };
export type { UseWalletComboboxParams, UseWalletComboboxReturn };
