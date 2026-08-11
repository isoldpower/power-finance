import type { BaseHTMLAttributes, FC } from "react";

import { BodyText } from "@shared/pure-components/typography";


const WhatIfDescription: FC<Omit<BaseHTMLAttributes<HTMLParagraphElement>, 'className'>> = ({
	children,
	...props
}) => (
	<BodyText
		size="13"
		leading="relaxed"
		className="max-w-[520px]"
		{...props}
	>
		{children}
	</BodyText>
);

WhatIfDescription.displayName = 'WhatIfDescription';

export { WhatIfDescription };
