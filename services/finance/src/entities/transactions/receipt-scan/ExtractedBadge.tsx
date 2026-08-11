import type { FC } from "react";

import { CheckIcon } from "@shared/pure-components/icons";
import { Text } from "@shared/pure-components/typography";

const ExtractedBadge: FC = () => (
	<Text as="div" size="11.5" weight="semibold" tone="positive" className="mb-2.5 inline-flex items-center gap-1.5 rounded-full bg-pos-soft px-2.5 py-1">
		<CheckIcon size={12} />
		Extracted
	</Text>
);

ExtractedBadge.displayName = 'ExtractedBadge';

export { ExtractedBadge };
