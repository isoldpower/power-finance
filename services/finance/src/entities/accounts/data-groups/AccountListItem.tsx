import { cn, FinanceMoney } from "@internal/ui-library";
import type { FC } from "react";
import type { Tone } from "@shared/utils";


interface AccountListItemProps {
	name: string;
	kind: string;
	color: string;
	active: boolean;
	balanceFormatted: string;
	balanceTone: Tone;
	onSelect: () => void;
}

const AccountListItem: FC<AccountListItemProps> = ({
	name,
	kind,
	color,
	active,
	balanceFormatted,
	balanceTone,
	onSelect
}) => (
	<div
		onClick={onSelect}
		className={cn(
			"flex cursor-pointer items-center gap-2.5 border-b border-border px-4 py-3 hover:bg-secondary",
			active && "bg-[var(--accent-soft)]"
		)}
	>
		<span className="size-2 flex-none rounded-[2px]" style={{ background: color }} />
		<div className="min-w-0 flex-1">
			<div className="truncate text-[13px] font-semibold">{name}</div>
			<div className="text-[10.5px] text-text-3">{kind}</div>
		</div>
		<FinanceMoney tone={balanceTone} size="sm">
			{balanceFormatted}
		</FinanceMoney>
	</div>
);

AccountListItem.displayName = 'AccountListItem';

export { AccountListItem };
export type { AccountListItemProps };
