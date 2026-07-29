import { SearchResultLabel, SearchResultMeta } from "@entity/navigation";
import { UiCommandItem } from "@internal/ui-library";

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
			<SearchResultLabel>
				{label}
			</SearchResultLabel>
			<SearchResultMeta>
				{meta}
			</SearchResultMeta>
		</UiCommandItem>
	);
}

export { SearchResult };