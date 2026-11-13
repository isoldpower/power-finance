import { cn, FinanceButton } from "@internal/ui-library";

import { FILTER_CONTROL_SIZE } from "./filter-control.ts";

import type { FC } from "react";
import type { OrderingType } from "@shared/data";


interface SortDirectionButtonProps {
	direction: OrderingType;
	onToggle: () => void;
}

const DIRECTION_LABEL: Record<OrderingType, string> = {
	ASC: 'Ascending',
	DESC: 'Descending',
};

const DIRECTION_ARROW: Record<OrderingType, string> = {
	ASC: '↑',
	DESC: '↓',
};

const SortDirectionButton: FC<SortDirectionButtonProps> = ({ direction, onToggle }) => (
	<FinanceButton
		variant="secondary"
		size="sm"
		onClick={onToggle}
		title="Switch sort direction"
		className={cn(FILTER_CONTROL_SIZE, "h-auto justify-start gap-1.5 px-3 text-xs")}
	>
		<span aria-hidden>
			{DIRECTION_ARROW[direction]}
		</span>
		{DIRECTION_LABEL[direction]}
	</FinanceButton>
);

SortDirectionButton.displayName = 'SortDirectionButton';

export { SortDirectionButton };
export type { SortDirectionButtonProps };
