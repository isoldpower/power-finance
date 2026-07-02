import type { FC, MouseEventHandler } from "react";
import { cn } from "@internal/ui-library";

interface WalletPinButtonProps {
	pinned: boolean;
	onClick: MouseEventHandler<HTMLButtonElement>;
}

const WalletPinButton: FC<WalletPinButtonProps> = ({ pinned, onClick }) => (
	<button
		type="button"
		title="Pin wallet"
		onClick={onClick}
		className={cn(
			"flex size-[26px] flex-none items-center justify-center rounded-[7px] hover:bg-surface-3",
			pinned ? "text-primary" : "text-text-3"
		)}
	>
		<svg width="14" height="14" viewBox="0 0 24 24" fill={pinned ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
			<path d="M9 4h6l-1 7 3 3v1H7v-1l3-3z" />
			<line x1="12" y1="15" x2="12" y2="21" />
		</svg>
	</button>
);

WalletPinButton.displayName = 'WalletPinButton';

export { WalletPinButton };
export type { WalletPinButtonProps };
