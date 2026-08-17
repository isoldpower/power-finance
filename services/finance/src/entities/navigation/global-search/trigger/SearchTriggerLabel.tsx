import type { FC, PropsWithChildren } from "react";


type SearchTriggerLabelProps = PropsWithChildren;

const SearchTriggerLabel: FC<SearchTriggerLabelProps> = ({ children }) => (
	<span className="min-w-0 flex-1 text-left">
		{children}
	</span>
);

SearchTriggerLabel.displayName = 'SearchTriggerLabel';

export { SearchTriggerLabel };
export type { SearchTriggerLabelProps };
