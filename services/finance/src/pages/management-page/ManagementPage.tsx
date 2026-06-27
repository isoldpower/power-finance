import type { FC } from "react";
import { useState } from "react";

import {
	ManagementHeader,
	LedgerBand,
	WalletsSection,
	TransactionsSection,
	ChartOfAccountsSection,
	ManagementPanel,
} from "@widget/management";
import type { PanelMode, PanelWallet } from "@widget/management";


const ManagementPage: FC = () => {
	const [panel, setPanel] = useState<{ mode: PanelMode; wallet?: PanelWallet } | null>(null);

	const openPanel = (mode: PanelMode, wallet?: PanelWallet) => { setPanel({ mode, wallet }); };
	const closePanel = () => { setPanel(null); };
	const switchPanel = (mode: PanelMode) => { setPanel({ mode }); };

	return (
		<div className="mx-auto flex max-w-[1320px] flex-col gap-6 px-[22px] pb-[70px] pt-[22px]">
			<ManagementHeader onOpenPanel={openPanel} className="fx-rise [animation-delay:0.05s]" />
			<LedgerBand className="fx-rise [animation-delay:0.12s]" />
			<WalletsSection onOpenPanel={openPanel} className="fx-rise [animation-delay:0.18s]" />
			<TransactionsSection onOpenPanel={openPanel} className="fx-rise [animation-delay:0.24s]" />
			<ChartOfAccountsSection className="fx-rise [animation-delay:0.3s]" />
			<ManagementPanel mode={panel?.mode ?? null} wallet={panel?.wallet} onClose={closePanel} onSwitch={switchPanel} />
		</div>
	);
};

ManagementPage.displayName = 'ManagementPage';

export { ManagementPage };
export default ManagementPage;
