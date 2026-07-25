import { SectionHeader, SlideOverTrigger } from "@shared/components";
import { cn } from "@internal/ui-library";

import type { FC } from "react";
import {
	SectionHeaderBorder,
	SectionHeaderCaption,
	SectionHeaderTitle
} from "@shared/components/section-header/SectionHeader.tsx";


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
			<SectionHeaderTitle>
				Wallets
			</SectionHeaderTitle>
			<SectionHeaderCaption>
				{total.toString()} wallets
			</SectionHeaderCaption>
			<SectionHeaderBorder />
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