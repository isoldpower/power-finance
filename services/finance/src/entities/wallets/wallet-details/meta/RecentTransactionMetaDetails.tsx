import { Caption } from "@shared/pure-components/typography";

import type { FC, PropsWithChildren } from "react";


type RecentTransactionMetaDetailsProps = PropsWithChildren;

const RecentTransactionMetaDetails: FC<RecentTransactionMetaDetailsProps> = ({ children }) => (
	<Caption size="11">
		{children}
	</Caption>
);

RecentTransactionMetaDetails.displayName = 'RecentTransactionMetaDetails';

export { RecentTransactionMetaDetails };
export type { RecentTransactionMetaDetailsProps };
