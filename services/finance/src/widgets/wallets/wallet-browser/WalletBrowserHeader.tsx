import { NewWalletButton } from "@entity/wallets";
import { useWalletsList } from "@feature/wallets";
import { SectionHeader } from "@shared/pure-components/layout";
import { SlideOverTrigger } from "@shared/overlays";

import type { FC } from "react";


interface WalletBrowserHeaderProps {
	createWalletPanel: string;
}

const WalletBrowserHeader: FC<WalletBrowserHeaderProps> = ({
	createWalletPanel,
}) => {
	const { wallets } = useWalletsList();

	return (
		<SectionHeader>
			<SectionHeader.Title>
				Wallets
			</SectionHeader.Title>
			<SectionHeader.Caption>
				{wallets.length.toString()} accounts
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