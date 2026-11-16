import { RowTitle } from "@internal/shared";

import type { FC, PropsWithChildren } from "react";


type RecentTransactionMetaDescriptionProps = PropsWithChildren;

const RecentTransactionMetaDescription: FC<RecentTransactionMetaDescriptionProps> = ({ children }) => (
	<RowTitle size="13" truncate>
		{children}
	</RowTitle>
);

RecentTransactionMetaDescription.displayName = 'RecentTransactionMetaDescription';

export { RecentTransactionMetaDescription };
export type { RecentTransactionMetaDescriptionProps };
