import type { FC, ReactNode } from "react";


interface BrowserListFxProps {
	isPending: boolean;
	wallets: unknown[];
	children: ReactNode;
}

const BrowserListFx: FC<BrowserListFxProps> = ({ isPending, wallets, children }) => {
	if (isPending) {
		return (
			<div className="px-4 py-[26px] text-center text-[13px] text-text-3">
				Loading…
			</div>
		);
	} else if (wallets.length === 0) {
		return (
			<div className="px-4 py-[26px] text-center text-[13px] text-text-3">
				No wallets match your filters.
			</div>
		);
	}
	
	return children;
}

export { BrowserListFx };