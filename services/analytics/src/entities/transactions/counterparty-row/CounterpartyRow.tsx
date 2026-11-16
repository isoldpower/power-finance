import { cn } from "@internal/ui-library";
import { CounterpartyRowAmount } from "./row/CounterpartyRowAmount.tsx";
import { CounterpartyRowBar } from "./row/CounterpartyRowBar.tsx";
import { CounterpartyRowName } from "./row/CounterpartyRowName.tsx";

import type { FC, PropsWithChildren } from "react";
import type { CounterpartyRowAmountProps } from "./row/CounterpartyRowAmount.tsx";
import type { CounterpartyRowBarProps } from "./row/CounterpartyRowBar.tsx";
import type { CounterpartyRowNameProps } from "./row/CounterpartyRowName.tsx";


type CounterpartyRowProps = PropsWithChildren<{
	onSelect: () => void;
}>;
type CounterpartyRowObject = FC<CounterpartyRowProps> & {
	Amount: FC<CounterpartyRowAmountProps>;
	Bar: FC<CounterpartyRowBarProps>;
	Name: FC<CounterpartyRowNameProps>;
};

const CounterpartyRow: CounterpartyRowObject = ({ onSelect, children }) => (
	<li>
		<button
			type="button"
			onClick={onSelect}
			className={cn(
				"group grid w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3 gap-y-1.5",
				"rounded-[var(--radius-md)]",
				"px-2.5 py-2 text-left transition-colors hover:bg-secondary",
			)}
		>
			{children}
		</button>
	</li>
);

CounterpartyRow.Amount = CounterpartyRowAmount;
CounterpartyRow.Bar = CounterpartyRowBar;
CounterpartyRow.Name = CounterpartyRowName;
CounterpartyRow.displayName = 'CounterpartyRow';

export { CounterpartyRow };
export type { CounterpartyRowProps };
