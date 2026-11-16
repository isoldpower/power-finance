import { Caption } from "../../../../pure-components/typography/index.ts";

import type { FC, PropsWithChildren } from "react";


type DemoPreparationStatusProps = PropsWithChildren;

const DemoPreparationStatus: FC<DemoPreparationStatusProps> = ({ children }) => (
	<div className="fx-slidein flex items-center gap-3">
		<span aria-hidden className="size-2 flex-none animate-pulse rounded-full bg-primary" />
		<Caption size="13" tone="strong">
			{children}
		</Caption>
	</div>
);

DemoPreparationStatus.displayName = 'DemoPreparationStatus';

export { DemoPreparationStatus };
export type { DemoPreparationStatusProps };
