import { cn } from "../../../utils/index.ts";
import { DemoModeBannerAction } from "./parts/DemoModeBannerAction.tsx";
import { DemoModeBannerMessage } from "./parts/DemoModeBannerMessage.tsx";
import { DemoModeBannerTag } from "./parts/DemoModeBannerTag.tsx";

import type { FC, PropsWithChildren } from "react";
import type { DemoModeBannerActionProps } from "./parts/DemoModeBannerAction.tsx";
import type { DemoModeBannerMessageProps } from "./parts/DemoModeBannerMessage.tsx";
import type { DemoModeBannerTagProps } from "./parts/DemoModeBannerTag.tsx";


type DemoModeBannerProps = PropsWithChildren;
type DemoModeBannerObject = FC<DemoModeBannerProps> & {
	Tag: FC<DemoModeBannerTagProps>;
	Message: FC<DemoModeBannerMessageProps>;
	Action: FC<DemoModeBannerActionProps>;
};

const DemoModeBanner: DemoModeBannerObject = ({ children }) => (
	<div
		role="status"
		aria-live="polite"
		className={cn(
			"flex min-h-9 items-center gap-3 border-b border-warn/40",
			"[background:linear-gradient(var(--warn-soft),var(--warn-soft)),var(--surface)]",
			"px-[22px] py-1.5"
		)}
	>
		{children}
	</div>
);

DemoModeBanner.Tag = DemoModeBannerTag;
DemoModeBanner.Message = DemoModeBannerMessage;
DemoModeBanner.Action = DemoModeBannerAction;
DemoModeBanner.displayName = 'DemoModeBanner';

export { DemoModeBanner };
export type { DemoModeBannerProps };
