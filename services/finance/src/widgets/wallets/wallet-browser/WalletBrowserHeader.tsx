import { NewWalletButton } from "@entity/wallets";
import { SectionHeader } from "@shared/pure-components/layout";
import { SlideOverTrigger } from "@shared/overlays";

import type { FC } from "react";


interface WalletBrowserHeaderProps {
	createWalletPanel: string;
	total: number;
}

const WalletBrowserHeader: FC<WalletBrowserHeaderProps> = ({
	createWalletPanel,
	total,
}) => {
	return (
		<SectionHeader>
			<SectionHeader.Title>
				Wallets
			</SectionHeader.Title>
			<SectionHeader.Caption>
				{total.toString()} wallets
			</SectionHeader.Caption>
			<SectionHeader.Border />
			<SlideOverTrigger panelId={createWalletPanel}>
				<NewWalletButton>
					<span>＋</span>
					<span>New wallet</span>
				</NewWalletButton>
			</SlideOverTrigger>
		</SectionHeader>
	);
}

export { WalletBrowserHeader };