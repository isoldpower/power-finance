import { cn } from "@internal/ui-library";
import { BranchIcon } from "@shared/pure-components/icons";
import { WhatIfDescription } from "./preview/WhatIfDescription.tsx";
import { WhatIfExample } from "./preview/WhatIfExample.tsx";
import { WhatIfHead } from "./preview/WhatIfHead.tsx";
import { WhatIfNotifyButton } from "./preview/WhatIfNotifyButton.tsx";

import type { BaseHTMLAttributes, FC, PropsWithChildren } from "react";
import type { IconProps } from "@shared/pure-components/icons";
import type { WhatIfDescriptionProps } from "./preview/WhatIfDescription.tsx";
import type { WhatIfExampleProps } from "./preview/WhatIfExample.tsx";
import type { WhatIfHeadProps } from "./preview/WhatIfHead.tsx";
import type { WhatIfNotifyButtonProps } from "./preview/WhatIfNotifyButton.tsx";


type WhatIfProps = PropsWithChildren<Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>>;
type WhatIfObject = FC<WhatIfProps> & {
	Description: FC<WhatIfDescriptionProps>;
	Example: FC<WhatIfExampleProps>;
	Head: FC<WhatIfHeadProps>;
	Icon: FC<IconProps>;
	NotifyButton: FC<WhatIfNotifyButtonProps>;
}

const WhatIf: WhatIfObject = ({
	children,
	...props
}) => (
	<div
		className={cn(
			"relative overflow-hidden rounded-[var(--radius-lg)] px-5 py-[18px]",
			"border border-dashed border-[var(--accent-border)] bg-[var(--accent-soft)]"
		)}
		{...props}
	>
		{children}
	</div>
);

WhatIf.Description = WhatIfDescription;
WhatIf.Example = WhatIfExample;
WhatIf.Head = WhatIfHead;
WhatIf.Icon = BranchIcon;
WhatIf.NotifyButton = WhatIfNotifyButton;
WhatIf.displayName = 'WhatIf';

export { WhatIf };
export type { WhatIfProps };
