import type { FC } from "react";
import { Caption, RowTitle } from "@shared/pure-components/typography";

interface RecentTransactionMetaProps {
	category: string;
	date: string;
	time: string;
}

const RecentTransactionMeta: FC<RecentTransactionMetaProps> = ({ 
	category,
	date,
	time,
}) => (
	<div className="min-w-0 flex-1">
		<RowTitle size="13" truncate>
			{category}
		</RowTitle>
		<Caption size="11">
			{date} · {time}
		</Caption>
	</div>
);

export { RecentTransactionMeta };