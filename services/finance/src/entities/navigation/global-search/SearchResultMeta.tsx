import type { FC, ReactNode } from "react";


interface SearchResultMetaProps {
	children: ReactNode;
}

const SearchResultMeta: FC<SearchResultMetaProps> = ({ children }) => (
	<span className="ml-auto truncate pl-2 font-numeric text-[11px] text-text-3">
		{children}
	</span>
);

SearchResultMeta.displayName = 'SearchResultMeta';

export { SearchResultMeta };
export type { SearchResultMetaProps };
