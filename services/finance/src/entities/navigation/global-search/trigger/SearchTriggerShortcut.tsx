import { MetaText } from "@shared/pure-components/typography";

import type { FC, PropsWithChildren } from "react";


type SearchTriggerShortcutProps = PropsWithChildren;

const SearchTriggerShortcut: FC<SearchTriggerShortcutProps> = ({ children }) => (
	<MetaText size="10" className="rounded-[4px] border border-border px-1.5">
		{children}
	</MetaText>
);

SearchTriggerShortcut.displayName = 'SearchTriggerShortcut';

export { SearchTriggerShortcut };
export type { SearchTriggerShortcutProps };
