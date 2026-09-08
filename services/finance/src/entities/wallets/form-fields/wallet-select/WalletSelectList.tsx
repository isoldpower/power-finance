import type { FC, PropsWithChildren } from "react";


type WalletSelectListProps = PropsWithChildren<{
	id?: string;
	label?: string;
}>;

const WalletSelectList: FC<WalletSelectListProps> = ({ children, id, label }) => (
	<div
		id={id}
		role="listbox"
		aria-label={label}
		className="max-h-[inherit] flex-1 overflow-y-auto overscroll-contain p-1"
	>
		{children}
	</div>
);

WalletSelectList.displayName = 'WalletSelectList';

export { WalletSelectList };
export type { WalletSelectListProps };
