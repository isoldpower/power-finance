import { Text } from "@shared/pure-components/typography";

import type { FC, PropsWithChildren } from "react";


type SearchResultLabelProps = PropsWithChildren;

const SearchResultLabel: FC<SearchResultLabelProps> = ({ children }) => (
	<Text weight="medium" truncate>
		{children}
	</Text>
);

SearchResultLabel.displayName = 'SearchResultLabel';

export { SearchResultLabel };
export type { SearchResultLabelProps };
