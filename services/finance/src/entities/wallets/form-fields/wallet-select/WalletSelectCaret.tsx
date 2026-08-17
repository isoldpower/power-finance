import { ChevronDownIcon } from "@shared/pure-components/icons";

import type { FC } from "react";


const WalletSelectCaret: FC = () => (
	<ChevronDownIcon size={12} className="flex-none text-text-3" />
);

WalletSelectCaret.displayName = 'WalletSelectCaret';

export { WalletSelectCaret };
