import { cn } from "@internal/ui-library";

import type { FC, PropsWithChildren } from "react";


type WalletPreviewHeaderProps = PropsWithChildren;

const WalletPreviewHeader: FC<WalletPreviewHeaderProps> = ({ children }) => (
	<div
		className={cn(
			"flex items-center justify-between text-white/90"
		)}
	>
		{children}
	</div>
);

WalletPreviewHeader.displayName = 'WalletPreviewHeader';

export { WalletPreviewHeader };
export type { WalletPreviewHeaderProps };
