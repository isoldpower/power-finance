import type { FC, PropsWithChildren } from "react";


type TableHeaderWalletProps = PropsWithChildren;

const TableHeaderWallet: FC<TableHeaderWalletProps> = ({ children }) => (
	<div className="hidden w-[130px] md:block">
		{children}
	</div>
);

TableHeaderWallet.displayName = 'TableHeaderWallet';

export { TableHeaderWallet };
export type { TableHeaderWalletProps };
