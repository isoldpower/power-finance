import type { FC } from "react";

import { CheckIcon } from "../icons/CheckIcon.tsx";

const ExtractedBadge: FC = () => (
	<div className="mb-2.5 inline-flex items-center gap-1.5 rounded-full bg-pos-soft px-2.5 py-1 text-[11.5px] font-semibold text-pos">
		<CheckIcon />
		Extracted
	</div>
);

ExtractedBadge.displayName = 'ExtractedBadge';

export { ExtractedBadge };
