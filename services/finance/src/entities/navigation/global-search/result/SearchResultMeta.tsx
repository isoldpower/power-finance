import { MetaText } from "@shared/pure-components/typography";

import type { FC, PropsWithChildren } from "react";


type SearchResultMetaProps = PropsWithChildren;

const SearchResultMeta: FC<SearchResultMetaProps> = ({ children }) => (
	<MetaText size="11" truncate className="ml-auto pl-2">
		{children}
	</MetaText>
);

SearchResultMeta.displayName = 'SearchResultMeta';

export { SearchResultMeta };
export type { SearchResultMetaProps };
