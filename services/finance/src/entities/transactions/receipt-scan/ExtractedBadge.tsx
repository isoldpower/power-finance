import { cn } from "@internal/ui-library";
import { CheckIcon } from "@shared/pure-components/icons";
import { Text } from "@shared/pure-components/typography";

import type { FC } from "react";


const ExtractedBadge: FC = () => (
	<Text
		as="div"
		size="11.5"
		weight="semibold"
		tone="positive"
		className={cn(
			"mb-2.5 inline-flex items-center gap-1.5 rounded-full bg-pos-soft px-2.5 py-1"
		)}
	>
		<CheckIcon size={12} />
		Extracted
	</Text>
);

ExtractedBadge.displayName = 'ExtractedBadge';

export { ExtractedBadge };
