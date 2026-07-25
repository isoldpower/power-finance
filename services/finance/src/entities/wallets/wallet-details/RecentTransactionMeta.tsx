import type { FC } from "react";

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
		<div className="truncate text-[13px] font-semibold">
			{category}
		</div>
		<div className="text-[11px] text-text-3">
			{date} · {time}
		</div>
	</div>
);

export { RecentTransactionMeta };