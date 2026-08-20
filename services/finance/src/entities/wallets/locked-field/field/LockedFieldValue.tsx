import { FinanceMoney } from "@internal/ui-library";

import type { FC, PropsWithChildren } from "react";


type LockedFieldTone = 'neutral' | 'neg';
type LockedFieldValueProps = PropsWithChildren<{
	tone?: LockedFieldTone;
}>;

const LockedFieldValue: FC<LockedFieldValueProps> = ({ tone = 'neutral', children }) => (
	<FinanceMoney size="sm" tone={tone}>
		{children}
	</FinanceMoney>
);

LockedFieldValue.displayName = 'LockedFieldValue';

export { LockedFieldValue };
export type { LockedFieldValueProps, LockedFieldTone };
