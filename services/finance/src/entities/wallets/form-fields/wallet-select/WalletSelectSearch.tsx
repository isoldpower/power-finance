import { cn } from "@internal/ui-library";
import { useCallback } from "react";
import { SearchIcon } from "@shared/pure-components/icons";
import { textClass } from "@shared/pure-components/typography";

import type { ChangeEvent, FC, KeyboardEventHandler, RefObject } from "react";


interface WalletSelectSearchProps {
	value: string;
	placeholder: string;
	inputRef?: RefObject<HTMLInputElement | null>;
	controls?: string;
	activeOption?: string;
	onValueChange: (value: string) => void;
	onKeyDown?: KeyboardEventHandler<HTMLInputElement>;
}

const WalletSelectSearch: FC<WalletSelectSearchProps> = ({
	value,
	placeholder,
	inputRef,
	controls,
	activeOption,
	onValueChange,
	onKeyDown,
}) => {
	const handleValueChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
		onValueChange(event.target.value);
	}, [onValueChange]);
	
	return (
		<div className="flex items-center gap-2 border-b border-border px-2.5 py-2">
			<SearchIcon />
			<input
				ref={inputRef}
				type="text"
				role="combobox"
				aria-expanded
				aria-controls={controls}
				aria-activedescendant={activeOption}
				aria-autocomplete="list"
				value={value}
				placeholder={placeholder}
				className={cn(
					textClass({ size: '13' }),
					"w-full bg-transparent text-foreground outline-none placeholder:text-text-3"
				)}
				onChange={handleValueChange}
				onKeyDown={onKeyDown}
			/>
		</div>
	);
}

WalletSelectSearch.displayName = 'WalletSelectSearch';

export { WalletSelectSearch };
export type { WalletSelectSearchProps };
