import { UiCommandItem } from "@internal/ui-library";
import { SearchResultLabel } from "./result/SearchResultLabel.tsx";
import { SearchResultMeta } from "./result/SearchResultMeta.tsx";

import type { FC, PropsWithChildren } from "react";
import type { SearchResultLabelProps } from "./result/SearchResultLabel.tsx";
import type { SearchResultMetaProps } from "./result/SearchResultMeta.tsx";


type SearchResultProps = PropsWithChildren<{
	search: string;
	onSelect: () => void;
}>;
type SearchResultObject = FC<SearchResultProps> & {
	Label: FC<SearchResultLabelProps>;
	Meta: FC<SearchResultMetaProps>;
}

const SearchResult: SearchResultObject = ({ children, search, onSelect }) => (
	<UiCommandItem value={search} onSelect={onSelect}>
		{children}
	</UiCommandItem>
);

SearchResult.Label = SearchResultLabel;
SearchResult.Meta = SearchResultMeta;
SearchResult.displayName = 'SearchResult';

export { SearchResult };
export type { SearchResultProps };
