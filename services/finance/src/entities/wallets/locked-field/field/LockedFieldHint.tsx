import { Caption } from "@shared/pure-components/typography";

import type { FC, PropsWithChildren } from "react";


type LockedFieldHintProps = PropsWithChildren;

const LockedFieldHint: FC<LockedFieldHintProps> = ({ children }) => (
	<Caption as="span" size="11.5" tone="muted" leading="snug">
		{children}
	</Caption>
);

LockedFieldHint.displayName = 'LockedFieldHint';

export { LockedFieldHint };
export type { LockedFieldHintProps };
