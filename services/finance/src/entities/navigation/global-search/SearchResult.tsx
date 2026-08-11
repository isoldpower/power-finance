import { SearchResultMeta } from "./SearchResultMeta.tsx";
import { UiCommandItem } from "@internal/ui-library";

import { Text } from "@shared/pure-components/typography";

import type { FC } from "react";


interface SearchResultProps {
	search: string;
	label: string;
	meta: string;
	onSelect: () => void;
}

const SearchResult: FC<SearchResultProps> = ({
	search,
	label,
	meta,
	onSelect,
}) => {
	return (
		<UiCommandItem
			value={search}
			onSelect={onSelect}
		>
			<Text weight="medium" truncate>
				{label}
			</Text>
			<SearchResultMeta>
				{meta}
			</SearchResultMeta>
		</UiCommandItem>
	);
}

export { SearchResult };