import { BodyText } from "@shared/pure-components/typography";

import type { BaseHTMLAttributes, FC, PropsWithChildren } from "react";


type WhatIfDescriptionProps = PropsWithChildren<Omit<BaseHTMLAttributes<HTMLParagraphElement>, 'className'>>;

const WhatIfDescription: FC<WhatIfDescriptionProps> = ({
	children,
	...props
}) => (
	<BodyText size="13" leading="relaxed" className="max-w-[520px]" {...props}>
		{children}
	</BodyText>
);

WhatIfDescription.displayName = 'WhatIfDescription';

export { WhatIfDescription };
export type { WhatIfDescriptionProps };
