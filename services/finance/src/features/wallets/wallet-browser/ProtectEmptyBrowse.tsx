import { Caption } from "@shared/pure-components/typography";

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
			<Caption size="13" className="px-4 py-[26px] text-center">
				No wallets match your filters.
			</Caption>
		);
	}
	
	return children;
}

export { ProtectEmptyBrowse };