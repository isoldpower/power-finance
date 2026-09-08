import { cn, FinanceMenuItem } from "@internal/ui-library";

import type { FC, PropsWithChildren } from "react";


type WalletSelectOptionProps = PropsWithChildren<{
	id?: string;
	selected?: boolean;
	highlighted?: boolean;
	onSelect: () => void;
	onHighlight?: () => void;
}>;

const WalletSelectOption: FC<WalletSelectOptionProps> = ({
	children,
	id,
	selected = false,
	highlighted = false,
	onSelect,
	onHighlight,
}) => (
	<FinanceMenuItem
		id={id}
		role="option"
		aria-selected={selected}
		className={cn("flex items-center gap-2.5", highlighted && "bg-secondary")}
		onClick={onSelect}
		onMouseMove={onHighlight}
	>
		{children}
	</FinanceMenuItem>
);

WalletSelectOption.displayName = 'WalletSelectOption';

export { WalletSelectOption };
export type { WalletSelectOptionProps };
