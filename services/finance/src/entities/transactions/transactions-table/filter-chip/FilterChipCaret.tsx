import { Caption } from "@shared/pure-components/typography";

import type { FC } from "react";


const FilterChipCaret: FC = () => (
	<Caption as="span" size="9">▾</Caption>
);

FilterChipCaret.displayName = 'FilterChipCaret';

export { FilterChipCaret };
