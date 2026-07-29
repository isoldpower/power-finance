import { SectionHeader, SlideOverTrigger } from "@shared/components";
import { cn } from "@internal/ui-library";

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
				<button 
					type="button"
					className={cn(
						"flex flex-row gap-2 items-center",
						"text-xs font-semibold text-primary hover:underline"
					)}
				>
					<span>＋</span>
					<span>New wallet</span>
				</button>
			</SlideOverTrigger>
		</SectionHeader>
	);
}

export { WalletBrowserHeader };