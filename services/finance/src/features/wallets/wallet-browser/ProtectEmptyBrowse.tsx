import type { Wallet } from "@entity/wallets";
import type { FC, ReactNode } from "react";


interface ProtectEmptyBrowseProps {
	wallets: Wallet[];
	children: ReactNode;
}

const ProtectEmptyBrowse: FC<ProtectEmptyBrowseProps> = ({ 
	wallets,
	children,
}) => {
	if (wallets.length === 0) {
		return (
			<div className="px-4 py-[26px] text-center text-[13px] text-text-3">
				No wallets match your filters.
			</div>
		);
	}
	
	return children;
}

export { ProtectEmptyBrowse };