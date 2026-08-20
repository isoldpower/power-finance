import { cn } from "@internal/ui-library";
import { SearchIcon } from "@shared/pure-components/icons";
import { textClass } from "@shared/pure-components/typography";
import { SearchTriggerLabel } from "./trigger/SearchTriggerLabel.tsx";
import { SearchTriggerShortcut } from "./trigger/SearchTriggerShortcut.tsx";

import type { ButtonHTMLAttributes, FC, PropsWithChildren } from "react";
import type { IconProps } from "@shared/pure-components/icons";
import type { SearchTriggerLabelProps } from "./trigger/SearchTriggerLabel.tsx";
import type { SearchTriggerShortcutProps } from "./trigger/SearchTriggerShortcut.tsx";


type SearchTriggerProps = PropsWithChildren<
	Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'type'>
>;
type SearchTriggerObject = FC<SearchTriggerProps> & {
	Icon: FC<IconProps>;
	Label: FC<SearchTriggerLabelProps>;
	Shortcut: FC<SearchTriggerShortcutProps>;
}

const SearchTrigger: SearchTriggerObject = ({
	children,
	...props
}) => (
	<button
		type="button"
		className={cn(
			"flex min-w-[230px] items-center gap-2 rounded-[var(--radius-md)] border border-border-strong",
			textClass({ size: '13', tone: 'subtle' }),
			"px-3 py-2 transition-colors hover:border-[var(--accent-border)]"
		)}
		{...props}
	>
		{children}
	</button>
);

SearchTrigger.Icon = SearchIcon;
SearchTrigger.Label = SearchTriggerLabel;
SearchTrigger.Shortcut = SearchTriggerShortcut;
SearchTrigger.displayName = 'SearchTrigger';

export { SearchTrigger };
export type { SearchTriggerProps };
