import { RecentTransactionMetaDescription } from "./meta/RecentTransactionMetaDescription.tsx";
import { RecentTransactionMetaDetails } from "./meta/RecentTransactionMetaDetails.tsx";

import type { FC, PropsWithChildren } from "react";
import type { RecentTransactionMetaDescriptionProps } from "./meta/RecentTransactionMetaDescription.tsx";
import type { RecentTransactionMetaDetailsProps } from "./meta/RecentTransactionMetaDetails.tsx";


type RecentTransactionMetaProps = PropsWithChildren;
type RecentTransactionMetaObject = FC<RecentTransactionMetaProps> & {
	Description: FC<RecentTransactionMetaDescriptionProps>;
	Details: FC<RecentTransactionMetaDetailsProps>;
}

const RecentTransactionMeta: RecentTransactionMetaObject = ({ children }) => (
	<div className="min-w-0 flex-1">
		{children}
	</div>
);

RecentTransactionMeta.Description = RecentTransactionMetaDescription;
RecentTransactionMeta.Details = RecentTransactionMetaDetails;
RecentTransactionMeta.displayName = 'RecentTransactionMeta';

export { RecentTransactionMeta };
export type { RecentTransactionMetaProps };
