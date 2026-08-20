import { CheckIcon } from "@shared/pure-components/icons";

import type { FC } from "react";


const WalletSelectSelected: FC = () => (
	<CheckIcon size={12} className="flex-none text-primary" />
);

WalletSelectSelected.displayName = 'WalletSelectSelected';

export { WalletSelectSelected };
