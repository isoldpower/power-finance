import { FinanceMenuItem } from "@internal/ui-library";

import type { FC, PropsWithChildren } from "react";


type WalletSelectOptionProps = PropsWithChildren<{
	onSelect: () => void;
}>;

const WalletSelectOption: FC<WalletSelectOptionProps> = ({ children, onSelect }) => (
	<FinanceMenuItem onClick={onSelect} className="flex items-center gap-2.5">
		{children}
	</FinanceMenuItem>
);

WalletSelectOption.displayName = 'WalletSelectOption';

export { WalletSelectOption };
export type { WalletSelectOptionProps };
