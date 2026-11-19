import { useHoverToggle } from "@shared/charts";
import { cn } from "@internal/ui-library";
import { CategoryRowAmount } from "./row/CategoryRowAmount.tsx";
import { CategoryRowChange } from "./row/CategoryRowChange.tsx";
import { CategoryRowName } from "./row/CategoryRowName.tsx";
import { CategoryRowShare } from "./row/CategoryRowShare.tsx";

import type { FC, PropsWithChildren } from "react";
import type { CategoryRowAmountProps } from "./row/CategoryRowAmount.tsx";
import type { CategoryRowChangeProps } from "./row/CategoryRowChange.tsx";
import type { CategoryRowNameProps } from "./row/CategoryRowName.tsx";
import type { CategoryRowShareProps } from "./row/CategoryRowShare.tsx";


type CategoryRowProps = PropsWithChildren<{
	active: boolean;
	onHover: (hovered: boolean) => void;
	onSelect: () => void;
}>;
type CategoryRowObject = FC<CategoryRowProps> & {
	Amount: FC<CategoryRowAmountProps>;
	Change: FC<CategoryRowChangeProps>;
	Name: FC<CategoryRowNameProps>;
	Share: FC<CategoryRowShareProps>;
};

const CategoryRow: CategoryRowObject = ({ active, onHover, onSelect, children }) => {
	const { handleHoverStart, handleHoverEnd } = useHoverToggle(onHover);

	return (
		<li>
			<button
				type="button"
				onClick={onSelect}
				onMouseEnter={handleHoverStart}
				onMouseLeave={handleHoverEnd}
				onFocus={handleHoverStart}
				onBlur={handleHoverEnd}
				className={cn(
					"grid w-full grid-cols-[minmax(0,1fr)_auto_auto] items-center gap-x-3 gap-y-1",
					"rounded-[var(--radius-md)]",
					"px-2.5 py-2 text-left transition-colors",
					active ? "bg-secondary" : "hover:bg-secondary",
				)}
			>
				{children}
			</button>
		</li>
	);
};

CategoryRow.Amount = CategoryRowAmount;
CategoryRow.Change = CategoryRowChange;
CategoryRow.Name = CategoryRowName;
CategoryRow.Share = CategoryRowShare;
CategoryRow.displayName = 'CategoryRow';

export { CategoryRow };
export type { CategoryRowProps };
