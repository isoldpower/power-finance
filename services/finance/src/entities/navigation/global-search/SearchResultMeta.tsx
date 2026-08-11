import type { FC, ReactNode } from "react";
import { MetaText } from "@shared/pure-components/typography";


interface SearchResultMetaProps {
	children: ReactNode;
}

const SearchResultMeta: FC<SearchResultMetaProps> = ({ children }) => (
	<MetaText size="11" truncate className="ml-auto pl-2">
		{children}
	</MetaText>
);

SearchResultMeta.displayName = 'SearchResultMeta';

export { SearchResultMeta };
export type { SearchResultMetaProps };
