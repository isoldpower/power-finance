import { Caption, RowTitle } from "@shared/pure-components/typography";

import type { FC } from "react";


interface RecentTransactionMetaProps {
	description: string;
	category: string;
	date: string;
}

const RecentTransactionMeta: FC<RecentTransactionMetaProps> = ({
	description,
	category,
	date,
}) => (
	<div className="min-w-0 flex-1">
		<RowTitle size="13" truncate>
			{description}
		</RowTitle>
		<Caption size="11">
			{category} · {date}
		</Caption>
	</div>
);

RecentTransactionMeta.displayName = 'RecentTransactionMeta';

export { RecentTransactionMeta };
export type { RecentTransactionMetaProps };
