import type { FC } from "react";
import { cn } from "@internal/ui-library";

import { SearchIcon } from "@shared/pure-components/icons";
import { MetaText, textClass } from "@shared/pure-components/typography";


interface SearchTriggerProps {
	onClick: () => void;
	placeholder?: string;
	className?: string;
}

const SearchTrigger: FC<SearchTriggerProps> = ({ onClick, placeholder = "Search…", className }) => (
	<button
		type="button"
		onClick={onClick}
		className={cn(
			"flex min-w-[230px] items-center gap-2 rounded-[var(--radius-md)] border border-border-strong",
			textClass({ size: '13', tone: 'subtle' }), "px-3 py-2 transition-colors hover:border-[var(--accent-border)]",
			className
		)}
	>
		<SearchIcon />
		<span className="min-w-0 flex-1 text-left">{placeholder}</span>
		<MetaText size="10" className="rounded-[4px] border border-border px-1.5">
			⌘K
		</MetaText>
	</button>
);

SearchTrigger.displayName = 'SearchTrigger';

export { SearchTrigger };
export type { SearchTriggerProps };
