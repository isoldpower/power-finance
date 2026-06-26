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
import type { PanelMode } from "@widget/management";


const ManagementPage: FC = () => {
	const [panelMode, setPanelMode] = useState<PanelMode | null>(null);

	const openPanel = (mode: PanelMode) => { setPanelMode(mode); };
	const closePanel = () => { setPanelMode(null); };

	return (
		<div className="mx-auto flex max-w-[1320px] flex-col gap-6 px-[22px] pb-[70px] pt-[22px]">
			<ManagementHeader onOpenPanel={openPanel} />
			<LedgerBand />
			<WalletsSection onOpenPanel={openPanel} />
			<TransactionsSection onOpenPanel={openPanel} />
			<ChartOfAccountsSection />
			<ManagementPanel mode={panelMode} onClose={closePanel} onSwitch={openPanel} />
		</div>
	);
};

ManagementPage.displayName = 'ManagementPage';

export { ManagementPage };
export default ManagementPage;
