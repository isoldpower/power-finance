import type { FC, RefObject } from "react";
import { cn } from "@internal/ui-library";

import { SearchIcon } from "./SearchIcon.tsx";

interface SearchFieldProps {
	inputRef: RefObject<HTMLInputElement | null>;
	value: string;
	onValueChange: (value: string) => void;
	open: boolean;
	onFocus: () => void;
	onBlur: () => void;
}

// Full search bar — 1024px and up.
const SearchField: FC<SearchFieldProps> = ({ inputRef, value, onValueChange, open, onFocus, onBlur }) => (
	<div className={cn(
		"flex min-w-[230px] items-center gap-2 rounded-[var(--radius-md)] border px-3 py-2 text-[13px] transition-colors",
		open ? "border-[var(--accent-border)]" : "border-border-strong"
	)}>
		<SearchIcon />
		<input
			ref={inputRef}
			value={value}
			onChange={(event) => { onValueChange(event.target.value); }}
			onFocus={onFocus}
			onBlur={onBlur}
			placeholder="Search…"
			className="min-w-0 flex-1 border-none bg-transparent text-foreground outline-none placeholder:text-[var(--text-3)]"
		/>
		<span className="rounded-[4px] border border-border px-1.5 font-numeric text-[10px] text-text-3">⌘K</span>
	</div>
);

SearchField.displayName = 'SearchField';

export { SearchField };
export type { SearchFieldProps };
