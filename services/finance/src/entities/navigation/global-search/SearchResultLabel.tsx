import type { FC, ReactNode } from "react";


interface SearchResultLabelProps {
	children: ReactNode;
}

const SearchResultLabel: FC<SearchResultLabelProps> = ({ children }) => (
	<span className="font-medium">
		{children}
	</span>
);

SearchResultLabel.displayName = 'SearchResultLabel';

export { SearchResultLabel };
export type { SearchResultLabelProps };
