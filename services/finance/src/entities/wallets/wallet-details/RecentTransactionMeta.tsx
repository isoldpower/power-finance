import type { FC } from "react";
import { Caption, RowTitle } from "@shared/pure-components/typography";

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

export { RecentTransactionMeta };