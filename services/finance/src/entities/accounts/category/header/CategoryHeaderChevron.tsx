import { Caption } from "@shared/pure-components/typography";

import type { FC } from "react";


interface CategoryHeaderChevronProps {
	selected?: boolean;
}

const CategoryHeaderChevron: FC<CategoryHeaderChevronProps> = ({ selected = false }) => (
	<Caption as="span" size="11" tone={selected ? 'strong' : 'subtle'}>
		›
	</Caption>
);

CategoryHeaderChevron.displayName = 'CategoryHeaderChevron';

export { CategoryHeaderChevron };
export type { CategoryHeaderChevronProps };
