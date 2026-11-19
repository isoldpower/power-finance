import { cn } from "../../../../utils/index.ts";
import { BodyText } from "../../../../pure-components/typography/index.ts";
import { AlertIcon } from "../../AlertIcon.tsx";

import type { FC, PropsWithChildren } from "react";


type DemoPreparationNoticeProps = PropsWithChildren;

const DemoPreparationNotice: FC<DemoPreparationNoticeProps> = ({ children }) => (
	<div
		className={cn(
			"fx-rise flex items-start gap-2 rounded-[var(--radius-md)] px-3 py-2",
			"border border-warn/40 bg-warn-soft"
		)}
	>
		<AlertIcon size={14} className="mt-0.5 flex-none text-warn" />
		<BodyText as="span" size="12.5" leading="relaxed">
			{children}
		</BodyText>
	</div>
);

DemoPreparationNotice.displayName = 'DemoPreparationNotice';

export { DemoPreparationNotice };
export type { DemoPreparationNoticeProps };
